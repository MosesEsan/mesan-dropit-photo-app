//FETCH REQUEST STATES

import {LOGGED_OUT} from "../auth/AuthReducer";

export const PUBLIC = false;
export const PRIVATE = true;
export const ALL = -1;

export const ASC = "asc";
export const DESC = "desc";

export const DATE = "createdAt";
// export const DISTANCE = "radius";
export const RADIUS = "radius";

export const FETCH_STATE = {
    INITIAL: 'INITIAL',
    REFRESH: 'REFRESH',
    MORE: 'MORE',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

export const CRUD_STATE = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
};

export const initialState = {
    isFetching: true,
    isRefreshing: false,

    error: null,
    data: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STATE.INITIAL: {
            return {...state, isFetching: action.isFetching, isRefreshing: false};
        }

        case FETCH_STATE.REFRESH: {
            return {...state, isFetching: false, isRefreshing: action.isRefreshing};
        }

        case FETCH_STATE.SUCCESS: {
            let newState = {
                data: action.data || [],
                error: null,
                // isFetching: false,
                isRefreshing: false
            };

            return {...state, ...newState};
        }

        case FETCH_STATE.ERROR: {
            let newState = {isFetching: false, isRefreshing: false, error: action.error};
            return {...state, ...newState};
        }

        // CRUD
        case CRUD_STATE.CREATE: {
            let [...data] = state.data;
            let newData = action.data || null;

            data.unshift(newData);

            return {...state, data};
        }

        case CRUD_STATE.UPDATE: {
            let [...clone] = state.data;
            let id = action.id || null;
            let data = action.data || {};

            const index = clone.findIndex((obj) => obj.id === id);
            if (index !== -1) {
                clone[index] = {...clone[index], ...data};
            }

            return {...state, data:clone};
        }

        case CRUD_STATE.DELETE: {
            let [...data] = state.data;

            let id = action.id;
            data = data.filter((obj) => obj.id !== id);

            return {...state, data};
        }

        case LOGGED_OUT:{
            alert("logged outr")
            return {...state, ...initialState};
        }

        default:
            return state;
    }
};

export default reducer;
