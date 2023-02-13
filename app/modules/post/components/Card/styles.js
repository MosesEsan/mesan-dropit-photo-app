import {StyleSheet} from "react-native";

const styless = StyleSheet.create({
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


const styles = StyleSheet.create({
    card: {
        marginBottom: 12,
    },

    imageContainer: {
        overflow: "hidden",
        flex: 1,
        borderRadius: 20,
        marginBottom: 20
    },

    cardImage: {
        flex: 1,
        backgroundColor: "#eee"
    },

    absolute: {
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },

    container: {
        paddingHorizontal: 8,
        borderRadius: 8,
    }
});

const minStyles = StyleSheet.create({
    card: {
        borderWidth:2, borderColor:"pink",
        paddingVertical: 6,
        position: 'relative',
        width: '100%', paddingRight: 6, paddingLeft: 6
    },

    cardImage: {
        height: "100%",
        backgroundColor: "#eee"
    }
});


export default styles;
export { minStyles}
