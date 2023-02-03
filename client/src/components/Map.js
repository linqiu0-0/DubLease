import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = { lat: 47.65, lng: -122.31 };

function Map() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyB10l8BBYLczauBgGiAYn9HE_XuHTxMz8M"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default Map;