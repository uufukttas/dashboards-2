import React, { useCallback, useRef, useState } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { GoogleMap, Marker, InfoWindow, useLoadScript, Libraries } from '@react-google-maps/api';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';

interface Station {
  id: number;
  name: string;
  mapPinIconCode: string;
  lat: number;
  lon: number;
}

const DashboardMap: React.FC = () => {
  const dashboardMapPrefix = `${BRAND_PREFIX}-dashboard-map`;
  const libraries: Libraries = ["places"];
  const mapRef = useRef<google.maps.Map | null>(null);
  const dashboardData = useSelector((state: RootState) => state.dashboardData);
  const [selectedMarker, setSelectedMarker] = useState<Station | null>(null);
  const [address, setAddress] = useState({ address: "", name: "" });
  const [selectedLocations, setSelectedLocations] = useState<{ lat: number, lon: number }>({ lat: 39.92503, lon: 32.83707 });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleMarkerClick = useCallback((marker: Station) => {
    setSelectedMarker(marker);
    fetchAddress(marker);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: marker.lat, lng: marker.lon });
    }
  }, []);

  const fetchAddress = async (marker: Station) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lon}&key=${apiKey}`);
    const data = await response.json();

    setAddress({
      address: data.status === 'OK' && data.results.length > 0 ? data.results[0].formatted_address : 'Address not found',
      name: marker.name
    });
  };

  const setMarkerIcon = (iconType: string) => {
    if (typeof window === 'undefined' || !window.google || !window.google.maps) {
      return undefined; // Handle case where google is not defined
    }
    const baseIconUrl = `https://maps.google.com/mapfiles/ms/icons/`;
    let iconUrl = `${baseIconUrl}${iconType}-dot.png`;

    if (iconType === '00') {
      iconUrl = `http://192.168.3.75:85${dashboardData.result.mapPinIcons[0].url}`;
    } else if (iconType === '01') {
      iconUrl = `http://192.168.3.75:85${dashboardData.result.mapPinIcons[1].url}`;
    }
    return { url: iconUrl, scaledSize: new window.google.maps.Size(40, 40) };
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className={`${dashboardMapPrefix}-container w-full px-2 my-4`}>
      <GoogleMap
        center={{ lat: selectedLocations.lat, lng: selectedLocations.lon }}
        mapContainerStyle={{ height: '635px' }}
        mapTypeId="roadmap"
        options={{
          fullscreenControl: false,
          disableDefaultUI: true,
        }}
        zoom={7}
        onLoad={onLoad}
      >
        {dashboardData.result?.stations?.map((marker: Station, index: number) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lon }}
            onClick={() => {
              handleMarkerClick(marker);
              setSelectedLocations({ lat: marker.lat, lon: marker.lon });
            }}
            icon={setMarkerIcon(marker.mapPinIconCode)} // Ensure icon is set here
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lon }}
            onCloseClick={() => {
              setSelectedMarker(null);
              setSelectedLocations({ lat: selectedMarker.lat, lon: selectedMarker.lon });
              setAddress({ address: "", name: "" });
            }}
          >
            <div className={`${dashboardMapPrefix}-information-window-container flex items-start justify-center p-2`}>
              <div className={`${dashboardMapPrefix}-information-window-content-container mr-2`}>
                <p className={`${dashboardMapPrefix}-information-window-header font-bold`}>{address.name}</p>
                <hr />
                <p style={{ margin: 0 }}>{address.address}</p>
              </div>
              <button onClick={() => setSelectedMarker(null)}>
                <IoCloseCircle className={`${dashboardMapPrefix} text-lg`} />
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default DashboardMap;
