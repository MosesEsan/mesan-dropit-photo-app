import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: "center"
    },

    card: {
        elevation: 2,
        backgroundColor: "#ccc",
        borderRadius: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        overflow: "hidden",
        marginVertical:5,
        marginHorizontal:10
    },

    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center"
    },

    cardContainer: {
        width: "100%",
        flex: 1,
        justifyContent: "center"
    }
});


const bigStyles = StyleSheet.create({
    card: {
        padding: 8,
    },

    imageContainer: {
        overflow: "hidden",
        flex: 1,
    },

    cardImage: {
        flex: 1,
        backgroundColor: "#eee"
    }
});


const minStyles = StyleSheet.create({
    card: {
        flex: 1 / 2,
        paddingVertical: 6,
        position: 'relative',
        width: '100%', paddingRight: 6, paddingLeft: 6

    },

    imageContainer: {},

    cardImage: {
        height: "100%",
        backgroundColor: "#eee"
    }
});


export default styles;
export {bigStyles, minStyles}
