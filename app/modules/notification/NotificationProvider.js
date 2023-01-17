import React, {useMemo, useContext, useReducer, createContext} from 'react';

//CREATE REDUCER
import reducer, {initialState, FETCH_STATE} from "./NotificationReducer"

// CONTEXT ==================================
const notificationContext = createContext();
const { Provider } = notificationContext;

function NotificationProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});

    const setLoading = (value, refresh= false) => {
        let type = refresh ? FETCH_STATE.REFRESH : FETCH_STATE.INITIAL
        let key =  refresh ? "isRefreshing" : "isFetching"
        let otherKey =  refresh ? "isFetching" : "isRefreshing"

        let payload = {
            type,
            [key]:value,
            [otherKey]:false
        }

        dispatch(payload);
    };

    const setData = (data) => {
        dispatch({type: FETCH_STATE.SUCCESS, data})
    };

    const setError = (error) => {
        dispatch({type: FETCH_STATE.ERROR, error})
    };

    const value = useMemo(() => {
        return {state, dispatch, setLoading, setData, setError};
    }, [state]);

    return (
        <Provider value={value}>
            {props.children}
        </Provider>
    );
}

const useNotification = () => useContext(homeContext);
export { notificationContext, useNotification }
export default NotificationProvider;

