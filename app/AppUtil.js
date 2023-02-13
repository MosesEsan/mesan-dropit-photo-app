import Toast from "react-native-toast-message";
import moment from "moment/moment";

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


export function myFromNow(date1, date2, short = false) {

    if (short) {
        moment.locale('en', {
            relativeTime: {
                future: 'in %s',
                // past: '%s ago',
                past: '%s',
                s: '1s',
                ss: '%ss',
                m: '1m',
                mm: '%dm',
                h: '1hr',
                hh: '%dh',
                d: '1d',
                dd: '%dd',
                M: '1m',
                MM: '%dM',
                y: '1y',
                yy: '%dY'
            }
        });
    }

    return moment(moment(date1)).fromNow()
    if (date2.diff(date1, 'days') > 180) {
        return date1.format("DD MMM YYYY");
    } else {
        // return date1.from(date2);
        return moment(moment(date1)).fromNow()
    }
}

export function convertDate(date){
    let milliseconds = moment(parseInt(date)).valueOf();
    return myFromNow(moment(milliseconds), moment())
}

export function generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
