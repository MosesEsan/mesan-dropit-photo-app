import React from "react";
import LocationProvider from "./components/location/LocationProvider";
import MapProvider from "./modules/post/MapProvider";

import PostProvider from "./modules/post/PostProvider";
import AuthProvider from "./modules/auth/AuthProvider";
import SettingProvider from "./modules/setting/SettingProvider";


import {QueueProvider} from "me-helper-views";

export default function ProviderContainer(props) {
    return (
        <AuthProvider>
        <SettingProvider>
                <LocationProvider>
                    <PostProvider>
                    <MapProvider>
                    <QueueProvider>
                        {props.children}
                    </QueueProvider>
                    </MapProvider>
                    </PostProvider>
                </LocationProvider>
        </SettingProvider>
        </AuthProvider>
    );
}

