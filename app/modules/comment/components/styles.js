import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    divider: {
        borderColor: "transparent",
        paddingHorizontal: 4,
        fontSize: 12,
        color: "#fff", lineHeight: 21, marginTop: 0
    },

    username: {
        fontSize: 14, color: "#fff",
    },

    date: {
        color: "#aaa", fontSize: 12, lineHeight: 22
    },

    userImage: {
        height: 35, width: 35, borderRadius: 50, backgroundColor: "#eee"
    },

    container: {
        paddingTop: 12,
        paddingBottom: 12, flex: 1, paddingHorizontal: 12,
    },

    header: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },

    text: {
        color: "#fff",
        lineHeight: 21, fontSize: 14,
        marginTop: 4
    }

});

export default styles;
