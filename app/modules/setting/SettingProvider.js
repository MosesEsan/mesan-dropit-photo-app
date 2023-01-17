import React, {useMemo, useContext, useReducer, createContext} from 'react';

//CREATE REDUCER
import reducer, {
    initialState,
    SET_ORDER_BY,
    SET_FILTER_TYPE,
    SET_RADIUS,
    ASC,
    DESC,
    PUBLIC,
    PRIVATE,
    ALL,
    SET_SHOW_ALL
} from "./SettingReducer"
export {PUBLIC, PRIVATE}

// CONTEXT ==================================
const settingContext = createContext();
const { Provider } = settingContext;

function SettingProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});

    const setOrderBy = (orderBy) => {
        dispatch({type: SET_ORDER_BY, orderBy})
    }

    const setFilterType = (filterType) => {
        dispatch({type: SET_FILTER_TYPE, filterType})
    }

    const setInRange = (inRange) => {
        dispatch({type: SET_IN_RANGE, inRange})
    }

    const setRadius = (radius) => {
        dispatch({type: SET_RADIUS, radius})
    }

    const setShowAll = (showAll) => {
        dispatch({type: SET_SHOW_ALL, showAll})
    }

    const value = useMemo(() => {
        return {
            state, dispatch,

            setOrderBy, setFilterType, setInRange, setRadius, setShowAll,
            ASC, DESC, PUBLIC, PRIVATE
        };
    }, [state]);

    return (
        <Provider value={value}>
            {props.children}
        </Provider>
    );
}

const useSetting = () => useContext(settingContext);
export { settingContext, useSetting }
export default SettingProvider;
