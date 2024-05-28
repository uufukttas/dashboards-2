import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { CITIES, DISTRICTS } from '../../constants/constants';
import { IFormDataProps } from './types';

interface Location {
    lat: number;
    lng: number;
}

interface MapProps {
    onSelectLocation: (location: Location) => void;
    formData: IFormDataProps;
}

const MapComponent: React.FC<MapProps> = ({ formData, onSelectLocation }) => {
    const [markerPosition, setMarkerPosition] = useState<Location | null>(null);
    const [mapCenter, setMapCenter] = useState<Location>({ lat: 41.0848993, lng: 28.9765895 });

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const lat = event.latLng?.lat();
        const lng = event.latLng?.lng();

        if (lat && lng) {
            const newLocation = { lat, lng };
            setMarkerPosition(newLocation);
            onSelectLocation(newLocation);
        }
    };
    const getAddressName = () => {
        const cityId = formData[`service-point-cityId`];
        const district = formData[`service-point-districtId`];

        return `${CITIES[cityId.toString()]},${DISTRICTS[district.toString()]}`;
    };

    const changeMapLocation = async () => {
        await axios
            .get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${getAddressName()}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
            ).then(response => {
                setMapCenter(response.data.results[0].geometry.location);
            })
    };

    useEffect(() => {
        changeMapLocation();
    }, [formData[`service-point-cityId`], formData[`service-point-districtId`]]);

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
                mapContainerStyle={{ width: '584px', height: '300px' }}
                center={mapCenter}
                zoom={10}
                onClick={handleMapClick}
            >
                {markerPosition && (
                    <Marker
                        position={markerPosition}
                        draggable={true}
                        onDragEnd={(event: google.maps.MapMouseEvent) => {
                            const lat = event?.latLng?.lat() || 41.0848993;
                            const lng = event?.latLng?.lng() || 28.9765895;

                            onSelectLocation({ lat, lng });
                        }}
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default MapComponent;
