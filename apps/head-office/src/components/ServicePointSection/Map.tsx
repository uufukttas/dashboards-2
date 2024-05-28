import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
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
    const libraries = ["places"];
    const mapRef = useRef<google.maps.Map>(null);
    const searchBoxRef = useRef<google.maps.places.SearchBox>(null);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        mapRef.current = map;
    }, []);

    const onSearchBoxLoad = useCallback(function callback(searchBox: google.maps.places.SearchBox) {
        searchBoxRef.current = searchBox;
    }, []);

    const onPlacesChanged = () => {
        const places = searchBoxRef.current?.getPlaces();
        if (places && places.length > 0) {
            const location = places[0].geometry?.location;

            if (location) {
                mapRef.current?.setCenter(location);
                mapRef.current?.setZoom(16);
            }
        }
    };

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
        <div className='map-container relative'>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} libraries={libraries}>
                <StandaloneSearchBox
                    onLoad={onSearchBoxLoad}
                    onPlacesChanged={onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Search places..."
                        style={{ zIndex: 10, boxSizing: 'border-box', border: '1px solid transparent', width: '240px', height: '32px', padding: '0 12px', borderRadius: '3px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', fontSize: '14px', outline: 'none', textOverflow: 'ellipses', position: 'absolute', top: '10px', left: '50%', marginLeft: '-120px' }}
                    />
                </StandaloneSearchBox>
                <GoogleMap
                    mapContainerStyle={{ width: '584px', height: '300px' }}
                    center={mapCenter}
                    zoom={10}
                    onClick={handleMapClick}
                    onLoad={onLoad}
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
        </div>
    );
}

export default MapComponent;
