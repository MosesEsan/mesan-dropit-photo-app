import React, {useMemo, useContext, createContext, useState} from 'react';

// CONTEXT ==================================
const mapContext = createContext();
const { Provider } = mapContext;

function MapProvider(props) {
    const [newMarker, setNewMarker] = useState(null);
    const [hasNewMarker, setHasNewMarker] = useState(false);

    const addNewMarker = (marker) => {
        setNewMarker(marker)
        setHasNewMarker(true)
    };

    const removeNewMarker = () => {
        setNewMarker(null)
        setHasNewMarker(false)
    };

    const value = useMemo(() => {
        return {hasNewMarker, newMarker, addNewMarker, removeNewMarker};
    }, [hasNewMarker]);

    return (
        <Provider value={value}>
            {props.children}
        </Provider>
    );
}

const useMap = () => useContext(mapContext);
export { mapContext, useMap }
export default MapProvider;
