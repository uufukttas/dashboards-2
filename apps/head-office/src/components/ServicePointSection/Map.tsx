import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '584px',
    height: '300px'
};

const center = {
    lat: 41.0848993,
    lng: 28.9765895
};

interface Location {
    lat: number;
    lng: number;
}

interface MapProps {
    onSelectLocation: (location: Location) => void;
}

const MapComponent: React.FC<MapProps> = ({ onSelectLocation }) => {
    const [markerPosition, setMarkerPosition] = useState<Location | null>(null);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const lat = event.latLng?.lat();
        const lng = event.latLng?.lng();

        if (lat && lng) {
            const newLocation = { lat, lng };
            setMarkerPosition(newLocation);
            onSelectLocation(newLocation);
        }
    };

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={handleMapClick}
            >
                {markerPosition && (
                    <Marker
                        position={markerPosition}
                        draggable={true}
                        onDragEnd={(event: google.maps.MapMouseEvent) => {
                            const lat = event?.latLng?.lat() || center.lat;
                            const lng = event?.latLng?.lng() || center.lng;
                            onSelectLocation({ lat, lng });
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default MapComponent;
