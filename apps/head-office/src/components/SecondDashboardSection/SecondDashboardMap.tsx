import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api';
import { BRAND_PREFIX } from '../../constants/constants';

interface MarkerInfo {
  lat: number;
  lng: number;
}

interface DashboardMapProps {
  markerList: MarkerInfo[];
}

const SecondDashboardMap: React.FC<DashboardMapProps> = ({ markerList }) => {
  const dashboardMapPrefix: string = `${BRAND_PREFIX}-dashboard-map`;
  const libraries: Libraries = ["places"];
  const mapRef = useRef<google.maps.Map | null>(null);

  const [selectedMarker, setSelectedMarker] = useState<MarkerInfo | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => { mapRef.current = map }, []);

  const handleMarkerClick = useCallback((marker: MarkerInfo) => {
    setSelectedMarker(marker);
    fetchAddress(marker.lat, marker.lng);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: marker.lat, lng: marker.lng });
      mapRef.current.setZoom(14);
    }
  }, []);

  const fetchAddress = async (lat: number, lng: number) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      setAddress(data.results[0].formatted_address);
    } else {
      setAddress('Address not found');
    }
  };

  return (
    <div className={`${dashboardMapPrefix}-container w-full px-2 my-4`}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} libraries={libraries}>
        <GoogleMap
          center={{ lat: 39.92504, lng: 32.83709 }} // Heart of Turkey - Ankara Anitkabir
          mapContainerStyle={{ height: '400px' }}
          mapTypeId='roadmap'
          options={{
            fullscreenControl: false,
            disableDefaultUI: true,
          }}
          zoom={6}
          onLoad={onLoad}
        >
          {
            markerList.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerClick(marker)}
              />
            ))
          }
          {
            selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => {
                  setSelectedMarker(null);
                  setAddress(null);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '8px' }}>
                    <p style={{ margin: 0 }}>{address || 'Loading address...'}</p>
                  </div>
                  <button onClick={() => setSelectedMarker(null)} style={{ marginLeft: 'auto', fontSize: '20px', fontWeight: "bolder" }}>X</button>
                </div>
              </InfoWindow>
            )
          }
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default SecondDashboardMap;
