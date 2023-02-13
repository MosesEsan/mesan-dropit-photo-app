import React, {useMemo, useContext, createContext, useState} from 'react';

//CREATE REDUCER
import useCRUD from "me-helper-views/hooks/useCRUD";

// CONTEXT ==================================
const postContext = createContext();
const { Provider } = postContext;

function PostProvider(props) {
    const [error, setError] = useState(null);

    const [isFetching, setIsFetching] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const {data, setData:setHookData, create, update, destroy} = useCRUD([])

    const setLoading = (value, refresh= false) => {
        if (refresh) setIsRefreshing(value)
        else setIsFetching(value)
    };

    const setData = (data) => {
        setHookData(data)
        setIsFetching(false)
        setIsRefreshing(false)
    };

    const clearData = () => {
        setHookData([])
    };

    const value = useMemo(() => {
        return {
            data, error,
            isFetching, isRefreshing,
            setLoading, setData, clearData, setError,
            addData:create, update, deleteData:destroy
        };
    }, [data, error, isFetching, isRefreshing]);


    return (
        <Provider value={value}>
            {props.children}
        </Provider>
    );
}

const usePost = () => useContext(postContext);
export { postContext, usePost }
export default PostProvider;
