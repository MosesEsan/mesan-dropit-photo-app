import React from "react";
import AnimatedSplash from "react-native-animated-splash-screen";

export default function AuthSplash(props) {
    return (
        <AnimatedSplash
            translucent={true}
            isLoaded={props.isLoaded}
            logoImage={require("../../../assets/images/app-logo2.png")}
            backgroundColor={"#0E0E0E"}
            logoHeight={150}
            logoWidth={150}>
            {props.children}
        </AnimatedSplash>
    )
}

AuthSplash.defaultProps = {
    isLoaded: false
}
