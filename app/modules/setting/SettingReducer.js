export const SET_ORDER_BY= "setting/SET_ORDER_BY"
export const SET_FILTER_TYPE= "setting/SET_FILTER_TYPE"
export const SET_IN_RANGE= "setting/SET_IN_RANGE"
export const SET_RADIUS= "setting/SET_RADIUS"
export const SET_SHOW_ALL= "setting/SET_SHOW_ALL"

export const PUBLIC = false;
export const PRIVATE = true;
export const ALL = -1;

export const ASC = "asc";
export const DESC = "desc";

export const DATE = "createdAt";
// export const DISTANCE = "radius";
export const RADIUS = "radius";

export const initialState = {
    orderBy: {[DATE]: DESC},
    filterType: PUBLIC,
    inRange:false,
    showAll:false,
    radius:5
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_BY: {
            return {...state, orderBy:action.orderBy};
        }

        case SET_FILTER_TYPE: {
            return {...state, filterType:action.filterType};
        }

        case SET_IN_RANGE: {
            return {...state, inRange:action.inRange};
        }

        case SET_RADIUS: {
            return {...state, radius:action.radius};
        }

        case SET_SHOW_ALL: {
            return {...state, showAll:action.showAll};
        }

        default:
            return state;
    }
};

export default reducer;
