import React, { useCallback, useRef } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api'
import { BRAND_PREFIX } from '../../constants/constants';

const DashboardMap = () => {
  const dashboardMapPrefix = `${BRAND_PREFIX}-dashboard-map`;
  const libraries: Libraries = ["places"];
  const mapRef = useRef<google.maps.Map>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // @ts-ignore
    mapRef.current = map;
}, []);

  return (
    <div className={`${dashboardMapPrefix}-container`}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} libraries={libraries}>
        <GoogleMap
          mapContainerStyle={{ width: '1240px', height: '300px' }}
          center={{ lat: 41.0848993, lng: 28.9765895 }}
          zoom={10}
          // onClick={handleMapClick}
          onLoad={onLoad}
        >
          {/* {markerPosition && (
            <Marker
              position={markerPosition}
              draggable={true}
              onDragEnd={(event: google.maps.MapMouseEvent) => {
                const lat = event?.latLng?.lat() || 41.0848993;
                const lng = event?.latLng?.lng() || 28.9765895;

                onSelectLocation({ lat, lng });
              }}
            />
          )} */}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default DashboardMap;
