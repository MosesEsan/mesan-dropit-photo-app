import React, {useMemo, useContext, useReducer, createContext} from 'react';

//CREATE REDUCER
import reducer, {initialState, FETCH_STATE, CRUD_STATE} from "./PostReducer"

// CONTEXT ==================================
const postContext = createContext();
const { Provider } = postContext;

function PostProvider(props) {
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

    const setIsFetchingMore = (isFetchingMore) => {
        dispatch({type: FETCH_STATE.MORE, isFetchingMore})
    }

    const setData = (data, page= 1, nextPage= null) => {
        dispatch({type: FETCH_STATE.SUCCESS, data, page, nextPage})
    }

    const setError = (error) => {
        dispatch({type: FETCH_STATE.ERROR, error})
    };

    //=======
    const addData = (data) => {
        dispatch({type: CRUD_STATE.CREATE, data})
    }

    const updateData = (id, data) => {
        dispatch({type: CRUD_STATE.UPDATE, id, data})
    }

    const deleteData = (id) => {
        dispatch({type: CRUD_STATE.DELETE, id})
    }

    const value = useMemo(() => {
        return {
            state, dispatch,
            setLoading, setIsFetchingMore,
            setData, setError,
            addData, updateData, deleteData
        };
    }, [state]);

    return (
        <Provider value={value}>
            {props.children}
        </Provider>
    );
}

const usePost = () => useContext(postContext);
export { postContext, usePost }
export default PostProvider;
