import {DefaultTheme} from "@react-navigation/native";

export const API_KEY = '764194619416732';
export const SECRET = 'd3qiXkl40SY1bHYLzgI-2-VGuqc';
export const CLOUD_NAME = 'de4hpdeid';

export const DIFont = {
    regular: "Poppins-Regular",
    bold: 'Poppins-Bold',
    thin: 'Poppins-Thin',
    light: 'Poppins-Light',
    extralight: 'Poppins-ExtraLight',
    medium: 'Poppins-Medium',
    semibold: 'Poppins-SemiBold',
    extrabold: 'Poppins-ExtraBold',
    black: 'Poppins-Black',
}

export const DIColors = {
    primary: "#0E0E0E",
    secondary: "#1C1C1C",

    // primary: "#0E0E0E",

    background: "#0E0E0E",
    white: '#ffffff',
    card: '#5162FF',

    text: "#121212",
    border: '#B5B5B5',
    // notification: 'rgb(255, 69, 58)',
}

export const DIScreenOptions = {
    headerStyle: {
        backgroundColor: DIColors.secondary,
        borderBottomWidth: 0,
        shadowColor: 'transparent'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerBackTitle: " "
}


export const PUBLIC = false;
export const PRIVATE = true;
export const ALL = -1;

export const ASC = "asc";
export const DESC = "desc";

export const DATE = "createdAt";
