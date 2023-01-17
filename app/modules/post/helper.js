import moment from "moment";
import {getDistance, isPointWithinRadius} from "geolib";

// moment.locale('en', {
//     relativeTime: {
//         future: 'in %s',
//         // past: '%s ago',
//         past: '%s',
//         s:  '1s',
//         ss: '%ss',
//         m:  '1m',
//         mm: '%dm',
//         h:  '1hr',
//         hh: '%dh',
//         d:  '1d',
//         dd: '%dd',
//         M:  '1m',
//         MM: '%dM',
//         y:  '1y',
//         yy: '%dY'
//     }
// });

export function myFromNow(date1, date2, short = false) {

    if (short) {
        moment.locale('en', {
            relativeTime: {
                future: 'in %s',
                // past: '%s ago',
                past: '%s',
                s: '1s',
                ss: '%ss',
                m: '1m',
                mm: '%dm',
                h: '1hr',
                hh: '%dh',
                d: '1d',
                dd: '%dd',
                M: '1m',
                MM: '%dM',
                y: '1y',
                yy: '%dY'
            }
        });
    }

    return moment(moment(date1)).fromNow()
    if (date2.diff(date1, 'days') > 180) {
        return date1.format("DD MMM YYYY");
    } else {
        // return date1.from(date2);
        return moment(moment(date1)).fromNow()
    }
}

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


export const checkIfWithinRadius = (point, center, radius) => {
    try {
        return isPointWithinRadius(point, center, radius * 1000);
    } catch (e) {
        throw new Error(e);
    }
};

export function generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
