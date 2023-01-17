import React from "react";
import {Icon} from "@rneui/themed";

export const NavButton = (props) => {
    return (
        <Icon {...props}
              style={[{justifyContent: "center", paddingHorizontal: 12, height: 44}]}
              containerStyle={[{
                  justifyContent: "center",
                  height: 44,
                  paddingHorizontal: 12
              }, props.style]}
        />
    )
}
