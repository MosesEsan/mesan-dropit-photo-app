import {getDistance, isPointWithinRadius} from "geolib";

export async function modifyDrops(drops, currentLocation, user) {
    return drops.map((drop, idx) => {
        const {...clone} = drop;
        let location = {
            latitude: parseFloat(drop.latitude),
            longitude: parseFloat(drop.longitude)
        }
        // alert("clone.user.id "+clone.user.idx +" ===" + user.id)

        clone['in_range'] = (clone.user.id === user.id) ? true : checkIfWithinRadius(currentLocation, location, drop.radius);

        clone['distance'] = calculateDistance(currentLocation, location);
        clone['distance_long'] = calculateDistance(currentLocation, location, true);

        return clone;
    });
}

export const checkIfWithinRadius = (point, center, radius) => {
    try {
        return isPointWithinRadius(point, center, radius * 1000);
    } catch (e) {
        throw new Error(e);
    }
};

export function getGeoMeta(drop, currentLocation, user) {
    const {...clone} = drop;
    let location = {
        latitude: parseFloat(drop.latitude),
        longitude: parseFloat(drop.longitude)
    }
    // alert("clone.user.id "+clone.user.id +" ===" + user.id)

    let in_range = (clone.user.id === user.id) ? true : checkIfWithinRadius(currentLocation, location, drop.radius);

    let distance = calculateDistance(currentLocation, location);
    let distance_long = calculateDistance(currentLocation, location, true);

    return {in_range, distance, distance_long};
}

export const calculateDistance = (from, to, full = false) => {
    try {
        // const dis = getPreciseDistance(from, to);
        const distance = getDistance(from, to);

        if (distance < 1000) {
            let label = full ? " meters" : "m"
            return `${distance}${label}`
        } else {
            let label = full ? " kilometers" : "km"
            let km = Math.round(distance / 1000)
            return `${km}${label}`
        }
    } catch (e) {
        throw new Error(e);
    }
};
