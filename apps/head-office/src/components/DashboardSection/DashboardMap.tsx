import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript, Libraries } from '@react-google-maps/api';
import axios from 'axios';
import { IoCloseCircle } from "react-icons/io5";
import { BRAND_PREFIX } from '../../constants/constants';

interface MapPinIcon {
  url: string;
};

interface Station {
  id: number;
  name: string;
  mapPinIconCode: string;
  lat: number;
  lon: number;
}

interface MarkerInfo {
  mapPinIcons: MapPinIcon[];
  stations: Station[];
}

interface DashboardMapProps {
};

const DashboardMap: React.FC<DashboardMapProps> = () => {
  const dashboardMapPrefix: string = `${BRAND_PREFIX}-dashboard-map`;
  const libraries: Libraries = ["places"];
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Station | null>(null);
  const [address, setAddress] = useState({
    address: "",
    name: ""
  });
  const [markerList, setMarkerList] = useState<MarkerInfo[]>([]);

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

    if (data.status === 'OK' && data.results.length > 0) {
      setAddress({
        address: data.results[0].formatted_address,
        name: marker.name
      });
    } else {
      setAddress({
        address: 'Address not found',
        name: marker.name
      });
    };
  };

  const setMarkerIcon = (iconType: string) => {
    if (!isLoaded || !window.google || !window.google.maps || !markerList) return undefined;

    const baseIconUrl = `https://maps.google.com/mapfiles/ms/icons/`;
    let iconUrl = `${baseIconUrl}${iconType}-dot.png`;

    if (iconType === '00') {
      iconUrl = `http://192.168.3.75:85${markerList.mapPinIcons[0].url}`;
    } else if (iconType === '01') {
      iconUrl = `http://192.168.3.75:85${markerList.mapPinIcons[1].url}`;
    }
    return {
      url: iconUrl,
      scaledSize: new window.google.maps.Size(40, 40),
    };
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded || !markerList) return <div>Loading...</div>;

  return (
    markerList?.stations?.length > 0 && (
      <div className={`${dashboardMapPrefix}-container w-full px-2 my-4`}>
        <GoogleMap
          center={{ lat: 39.92504, lng: 30.83709 }} // Heart of Turkey - Ankara Anitkabir
          mapContainerStyle={{ height: '635px' }}
          mapTypeId="roadmap"
          options={{
            fullscreenControl: false,
            disableDefaultUI: true,
          }}
          zoom={7}
          onLoad={onLoad}
        >
          {
            markerList.stations.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lon }}
                onClick={() => handleMarkerClick(marker)}
                icon={setMarkerIcon(marker.mapPinIconCode)} // Özel ikon tipi burada belirleniyor
              />
            ))
          }
          {
            selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lon }}
                onCloseClick={() => {
                  setSelectedMarker(null);
                  setAddress({
                    address: "",
                    name: ""
                  });
                }}
              >
                <div className={`${dashboardMapPrefix}-information-window-container flex items-start justify-center`}>
                  <div className={`${dashboardMapPrefix}-information-window-content-container mr-2`}>
                    <p>{address.name}</p>
                    <p style={{ margin: 0 }}>{address.address}</p>
                  </div>
                  <button onClick={() => setSelectedMarker(null)}>
                    <IoCloseCircle className={`${dashboardMapPrefix} text-lg`} />
                  </button>
                </div>
              </InfoWindow>
            )
          }
        </GoogleMap>
      </div>
    )
  );
};

export default DashboardMap;
