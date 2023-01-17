//FETCH REQUEST STATES
export const FETCH_STATE = {
    INITIAL: 'INITIAL',
    REFRESH: 'REFRESH',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

export const initialState = {
    isFetching: true,
    isRefreshing: false,

    error: null,
    data: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_STATE.INITIAL:{
            return {...state, isFetching: action.isFetching, isRefreshing:false};
        }

        case FETCH_STATE.REFRESH:{
            return {...state, isFetching:false, isRefreshing: action.isRefreshing};
        }

        case FETCH_STATE.SUCCESS:{
            let newState = {
                data: action.data || [],
                error: null,
                isFetching:false,
                isRefreshing:false
            };

            return {...state, ...newState};
        }

        case FETCH_STATE.ERROR:{
            let newState =  {isFetching:false, isRefreshing:false, error: action.error};
            return {...state, ...newState};
        }

        default:
            return state;
    }
};

export default reducer;
