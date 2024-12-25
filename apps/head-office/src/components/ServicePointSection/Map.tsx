import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { GoogleMap, Libraries, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../constants/constants';
import { ILocation, IMapProps } from './types';

const MapComponent: React.FC<IMapProps> = ({ cityId, districtId, lat, lng, onSelectLocation }) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-modal-map`;
  const libraries: Libraries = ['places'];
  const mapRef = useRef<google.maps.Map>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox>(null);
  const [mapCenter, setMapCenter] = useState<ILocation>({ lat, lng });
  const [markerPosition, setMarkerPosition] = useState<ILocation>({ lat, lng });

  const changeMapLocation = async () => {
    await axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${getAddressName()}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
      .then((response) => {
        if (response.data.results.length > 0) {
          setMapCenter(response.data.results[0].geometry.location);
        }
      });
  };
  const getAddressName = () => {
    return `${CITIES[cityId?.toString() as keyof typeof CITIES]},${DISTRICTS[districtId?.toString() as keyof typeof DISTRICTS]
      }`;
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onPlacesChanged();
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
  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      // @ts-ignore
      mapRef.current = map;
    },
    [cityId, districtId],
  );
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
  const onSearchBoxLoad = useCallback(
    function callback(searchBox: google.maps.places.SearchBox) {
      // @ts-ignore
      searchBoxRef.current = searchBox;
    },
    [cityId, districtId],
  );

  useEffect(() => {
    changeMapLocation();
  }, [cityId, districtId]);

  return (
    <div className={`${sectionPrefix}-map-container relative`}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} libraries={libraries}>
        <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
          <input
            type="text"
            placeholder="Search places..."
            style={{
              border: '1px solid transparent',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              boxSizing: 'border-box',
              fontSize: '14px',
              height: '40px',
              left: '50%',
              marginLeft: '-120px',
              outline: 'none',
              padding: '0 12px',
              position: 'absolute',
              textOverflow: 'ellipses',
              top: '10px',
              width: '240px',
              zIndex: 10,
            }}
            onKeyPress={handleKeyPress}
          />
        </StandaloneSearchBox>
        {markerPosition && (
          <GoogleMap
            mapContainerStyle={{ width: '568px', height: '300px' }}
            center={mapCenter}
            zoom={18}
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
        )}
      </LoadScript>
    </div>
  );
};

export default MapComponent;
