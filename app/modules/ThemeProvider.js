import React, {useMemo, useContext, createContext} from 'react';
import {Icon} from "@rneui/themed";

export const backIcon = {
    name: 'keyboard-backspace',
    type: 'material',
    size: 34,
    color: "#fff",
    style: {alignItems: "flex-start"}
};

export const NavButton = (props) => {
    return (
        <Icon {...props} containerStyle={[{flex: 1}, props.style]}
              style={[{justifyContent: "center", paddingHorizontal: 12, height: 44}]}
        />
    )
}

NavButton.defaultProps = {
    style: {}
}

// CONTEXT ===================================
const themeContext = createContext();
const {Provider} = themeContext;

function ThemeProvider(props) {
    // const backgroundColor = "#070704"
    const backgroundColor = "#222222"
    const primaryColor = "#222222"
    const secondaryColor = "#282727"
    const textColor = "rgb(242,116,5)"
    const textColorLight = "rgba(242,116,5,.6)"
    const headerStyle = {
            backgroundColor,
            borderBottomWidth:0,
            shadowColor: 'transparent'
        };

    const headerTitleStyle = {
        fontWeight: "bold",
        color: '#fff',
        };

    const headerTintColor = '#fff';

    //SCREEN OPTIONS
    let config = {
        headerStyle,
        headerTintColor,
        headerTitleStyle
    }

//Creates the options for the stack Screen
    let options = ({navigation}, title="", withBackButton=true) => (
        {
            title,
            ...config,
            headerLeft: withBackButton ? () => <NavButton {...backIcon} onPress={() => navigation.pop()}/> : null
        }
    )

    const value = useMemo(() => {
        return {
            backgroundColor, primaryColor, secondaryColor, textColor, headerStyle,headerTitleStyle, headerTintColor,
            textColorLight, config, options
        };
    }, []);

    return (
        <Provider value={value}>
            {props.children}
        </Provider>
    );
}

const useTheme = () => useContext(themeContext);
export {themeContext, useTheme}
export default ThemeProvider;
