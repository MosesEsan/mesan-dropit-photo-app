export const GETTING_LOCATION = 'GETTING_LOCATION';
export const SAVE_LOCATION = 'SAVE_LOCATION';

export const REQUESTING_PERMISSION = 'REQUESTING_PERMISSION';
export const SAVE_PERMISSION = 'SAVE_PERMISSION';

export const RETRIEVING_CURRENT_LOCATION = 'RETRIEVING_CURRENT_LOCATION';
export const SAVE_CURRENT_LOCATION = 'SAVE_CURRENT_LOCATION';

export const initialState = {
    isRequestingPermission: false,
    hasLocationPermission:false,
    permissionRetrievalErrorMessage:null,

    isRetrievingCurrentLocation: false,
    currentLocation: null,
    locationRetrievalErrorMessage: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case REQUESTING_PERMISSION:{
            return {...state, isRequestingPermission: action.isRequestingPermission, permissionRetrievalErrorMessage:action.errorMessage || state.permissionRetrievalErrorMessage};
        }

        case SAVE_PERMISSION:{
            return {...state, hasLocationPermission: action.hasLocationPermission, isRequestingPermission:false};
        }

        case RETRIEVING_CURRENT_LOCATION:{
            return {...state, isRetrievingCurrentLocation: action.isRetrievingCurrentLocation, locationRetrievalErrorMessage:action.errorMessage || state.locationRetrievalErrorMessage};
        }

        case SAVE_CURRENT_LOCATION:{
            return {...state, currentLocation: action.currentLocation,  isRetrievingCurrentLocation:false};
        }

        case GETTING_LOCATION:{
            return {...state, isRetrievingLocation: action.isRetrievingLocation};
        }

        case SAVE_LOCATION:{
            return {...state, location: action.location, isRetrievingLocation:false};
        }

        default:
            return state;
    }
};

export default reducer;