import {StyleSheet} from "react-native";
import {lightColors} from "@rneui/themed";
import {DIFont} from "../../../AppConfig";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
    },

    wrapper: {
        flex: 1,
        // backgroundColor: "#fff",
    },

    headerText: {
        fontWeight: "800",
        fontSize: 32,
        lineHeight: 46,
        fontFamily: 'Helvetica Neue',
        marginTop: 20,
        marginBottom: 15,
        marginRight: "5%",
        color: "rgb(55,69,87)"
    },

    subText: {
        fontSize: 18,
        lineHeight: 25,
        fontWeight: "400",
        fontFamily: 'Helvetica Neue',
        marginRight: "10%",
        color: "rgb(55,69,87)"
    },

    flex: {
        flex: 1
    },

    buttonContainer: {
        height: 70,
        flexDirection: "row",
        padding: 12,
        backgroundColor: "white"
    },

    count: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 17,
        color: "#000"
    },

    header: {
        fontFamily: 'HelveticaNeue-Bold',
        fontSize: 18,
        color: "#000", marginVertical: 24
    },

    subHeader: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 16,
        color: "#000", marginBottom: 4
    },

    subtitle: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 14,
        color: "#797575",
        marginBottom: 8
    },

    button: {
        width: 60,
        height: 34,
        borderRadius: 8,
        marginTop: -2, marginRight: 4,
    },

    dropButton: {
        // width: "100%",
        margin: 24,
        height: 64,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#000",
    },

    dropButtonText: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 18,
    },

    buttonText: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 16,
    },

    author: {
        fontSize: 20,
        lineHeight: 22,
        fontFamily: 'Helvetica Neue',
        height: 80,
        padding: 16,
        backgroundColor: 'white',
    },

    text: {
        fontSize: 14,
        fontFamily: DIFont.semibold,
        lineHeight: 20,
        color: "#FFF",
        padding: 16,
        paddingTop: 16,
        flex:1,

    // borderWidth:StyleSheet.hairlineWidth, borderColor:"#ccc",
    borderRadius: 12, marginHorizontal: 20,
    backgroundColor:"rgba(255,255,255,.3)", marginTop: 20,
    },

    image: {
        height: '100%'
    },
    gridContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },

    privacyOption: {
        flex: 1
    },

    radiusContainer: {
        flex: 1,
        paddingHorizontal: 20
    },

    radiusWrapper: {
        flex: 1, borderTopWidth: 1, borderTopColor:"#ccc"
    },

    sliderContainer: {
        flex: 1, alignItems: 'stretch', justifyContent: 'center'
    },

    overlayView:{
    },

    overlay:{
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    list: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: lightColors.greyOutline,
    },


    label:{
        fontWeight: "600", fontSize: 15
    },


        section: {
            marginTop: 20,
            marginHorizontal: 20,
            overflow: "hidden"
        },

        absolute: {
            alignItems: 'center',
            justifyContent: 'center',
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0


}
}
);

export default styles;
