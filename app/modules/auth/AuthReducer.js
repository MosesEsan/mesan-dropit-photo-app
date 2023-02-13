export const LOGGED_IN = `auth/LOGGED_IN`;
export const LOGGED_OUT = `auth/LOGGED_OUT`;
export const UPDATE_USER = `auth/UPDATE_USER`;

export const  initialState = {
    isLoggedIn: false,
    currentUser: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN:{
            let { user } = action;

            return {...state, isLoggedIn: true, currentUser:user};
        }

        case LOGGED_OUT:{
            return {...state, ...initialState};
        }

        case UPDATE_USER:{
            let { user } = action;
            return {...state, currentUser:user};
        }

        default:
            return state;
    }
};

export default reducer;
