import React, { useCallback, useEffect, useRef, useState } from 'react';
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
};
interface DashboardMapProps {
};

const CACHE_KEY = 'dashboardMapCache';
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 dakika (300,000 ms)

const DashboardMap: React.FC<DashboardMapProps> = () => {
  const dashboardMapPrefix: string = `${BRAND_PREFIX}-dashboard-map`;
  const libraries: Libraries = ["places"];
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Station | null>(null);
  const [address, setAddress] = useState({
    address: "",
    name: ""
  });
  const [markerList, setMarkerList] = useState<MarkerInfo | null>(null);
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

  // LocalStorage'dan cache verisini kontrol et ve veriyi güncelle
  const getMarkerList = async () => {
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      // 5 dakika kontrolü
      if (Date.now() - timestamp < CACHE_EXPIRATION) {
        setMarkerList(data);
        return;
      }
    }

    // Cache süresi dolduysa veya cache yoksa yeni veri çek
    await axios.post('http://192.168.3.75:85/api/App/stations').then((response) => {
      const result = response.data.result;
      setMarkerList(result);
      // LocalStorage'a yeni veriyi kaydet
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: result, timestamp: Date.now() }));
    });
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

  useEffect(() => {
    getMarkerList();
  }, []);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded || !markerList) return <div>Loading...</div>;

  return (
    // @ts-ignore
    markerList?.stations?.length > 0 && (
      <div className={`${dashboardMapPrefix}-container w-full px-2 my-4`}>
        <GoogleMap
          center={{ lat: selectedLocations.lat, lng: selectedLocations.lon }} // Heart of Turkey - Ankara Anitkabir
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
            // @ts-ignore
            markerList.stations.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lon }}
                onClick={() => {
                  handleMarkerClick(marker)
                  setSelectedLocations({ lat: marker.lat, lon: marker.lon });
                }}
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
                  setSelectedLocations({ lat: selectedMarker.lat, lon: selectedMarker.lon });
                  setAddress({
                    address: "",
                    name: ""
                  });
                }}
              >
                <div className={`${dashboardMapPrefix}-information-window-container flex items-start justify-center p-2`}>
                  <div className={`${dashboardMapPrefix}-information-window-content-container mr-2`}>
                    <p className={`${dashboardMapPrefix}-information-window-header font-bold`}>{address.name}</p>
                    < hr />
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
