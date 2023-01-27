import Toast from "react-native-toast-message";

export function showToast(type, title, message) {
    Toast.show({
        type: type,
        text1: title,
        text2: message
    });
}


export function showError(title, message) {
    Toast.show({
        type: 'error',
        text1: title,
        text2: message
    });
}
