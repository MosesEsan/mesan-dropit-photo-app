import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222222"
    },

    wrapper: {
        flex: 1,
        padding: 25
    },

    headerContainer:{
        marginBottom: 40
    },

    headerText: {
        fontWeight: "800",
        fontSize: 28,
        lineHeight: 46,
        fontFamily: 'Helvetica Neue',
        textAlign:"center",
        color: "#fff"
    },

    subHeader: {
        fontWeight: "500",
        fontSize: 15,
        fontFamily: 'Helvetica Neue',
        textAlign:"center",
        color: "#fff"
    },

    inputsContainer:{
        marginTop: 10
    },

    button: {
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#C55110",
        marginTop:10
    },

    buttonText: {
        fontWeight: "500",
        fontSize: 17,
        fontFamily: 'Helvetica Neue',
        textAlign:"center",
        color: "#fff",
    },

    error:{
        color: "red",
        marginVertical: 12
    },

    ctaLink:{
        fontWeight: "600", color: "#C55110"
    },

    labelText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "400",
        fontSize: 15
    }
});


export default styles;
