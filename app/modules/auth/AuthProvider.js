import React, {useMemo, useContext, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//IMPORT REDUCER
import reducer, {initialState, LOGGED_IN, LOGGED_OUT, UPDATE_USER} from "./AuthReducer"

// CONFIG KEYS [Storage Keys]===================================
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const keys = [TOKEN_KEY, USER_KEY];

// CONTEXT ===================================
const AuthContext = React.createContext();
const { Provider } = AuthContext;

// 2 - PROVIDER===================================
function AuthProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});

    // Get Auth state - Logs user in if data is available
    const getAuthState = async () => {
        try {
            let data = null;

            let token = await AsyncStorage.getItem(TOKEN_KEY);
            let user = await AsyncStorage.getItem(USER_KEY);
            if (token !== null && user!== null) data = {token, user:JSON.parse(user)}

            //Check Data
            if (data == null ) await handleLogout();
            else if (data) {
                //DISPATCH TO REDUCER
                dispatch({type: LOGGED_IN, user:data.user});
            }

            return data;
        } catch (error) {
            throw new Error(error)
        }
    };

    // Handle Login
    const handleLogin = async (data) => {
        try{
            let {user, token} = data;
            let data_ = [
                [USER_KEY, JSON.stringify(user)],
                [TOKEN_KEY, token]
            ];

            await AsyncStorage.multiSet(data_);

            //DISPATCH TO REDUCER
            dispatch({type: LOGGED_IN, user});
        }catch (error) {
            throw new Error(error);
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        try{
            await AsyncStorage.multiRemove(keys)

            //DISPATCH TO REDUCER
            dispatch({type: LOGGED_OUT});
        }catch (error) {
            throw new Error(error);
        }
    };

    //UPDATE USER LOCAL STORAGE DATA AND DISPATCH TO REDUCER
    const updateCurrentUser = async (user) => {
        try {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
            dispatch({type: UPDATE_USER, user}); //DISPATCH TO REDUCER
        } catch (error) {
            throw new Error(error);
        }
    };

    const value = useMemo(() => {
        return {
            state, getAuthState, handleLogin, handleLogout, updateCurrentUser
        };
    }, [state]);

    return (
        <Provider value={value}>
            {props.children}
        </Provider>
    );
}

const useAuth = () => useContext(AuthContext);
export default AuthProvider;
export { AuthContext, AuthProvider, useAuth };
