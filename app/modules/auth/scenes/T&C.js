import React from 'react';
import WebView from 'react-native-webview';

export default function TermsAndCondition() {
    return (
        <WebView source={{uri: 'https://www.google.com/'}} style={{marginTop: 0}} />
    );
}

export function PrivacyPolicy() {
    return (
        <WebView source={{uri: 'mosesesan.com'}} style={{marginTop: 0}} />
    );
}
