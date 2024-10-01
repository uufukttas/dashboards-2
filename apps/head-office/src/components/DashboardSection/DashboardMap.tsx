import React, { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript, Libraries } from '@react-google-maps/api';
import axios from 'axios';
import { BRAND_PREFIX } from '../../constants/constants';

interface MapPinIcon {
  url: string;
  // other properties if needed
}
interface MarkerInfo {
  mapPinIcons: MapPinIcon[];
  stations: { id: number; name: string; mapPinIconCode: string; }[];
  lat: number;
  lon: number;
}

interface DashboardMapProps {
};

const DashboardMap: React.FC<DashboardMapProps> = () => {
  const dashboardMapPrefix: string = `${BRAND_PREFIX}-dashboard-map`;
  const libraries: Libraries = ["places"];
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerInfo | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [markerList, setMarkerList] = useState<MarkerInfo[]>([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // const handleMarkerClick = useCallback((marker: MarkerInfo) => {
  //   setSelectedMarker(marker);
  //   fetchAddress(marker.lat, marker.lon);
  //   if (mapRef.current) {
  //     mapRef.current.panTo({ lat: marker.lat, lng: marker.lon });
  //     mapRef.current.setZoom(14);
  //   }
  // }, []);

  // const fetchAddress = async (lat: number, lng: number) => {
  //   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  //   const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
  //   const data = await response.json();

  //   if (data.status === 'OK' && data.results.length > 0) {
  //     setAddress(data.results[0].formatted_address);
  //   } else {
  //     setAddress('Address not found');
  //   }
  // };

  const getMarkerList = async () => {
    await axios.post('http://192.168.3.75:85/api/App/stations').then((response) => {
      setMarkerList(response.data.result);
    });
  };

  // `window.google`'ın yüklenmesini kontrol ederek `TypeError` hatasını önlüyoruz
  const setMarkerIcon = (iconType: string) => {
    if (!isLoaded || !window.google || !window.google.maps) return undefined;

    // Dinamik olarak özel ikon URL'si belirleme
    const baseIconUrl = `https://maps.google.com/mapfiles/ms/icons/`;
    let iconUrl = `${baseIconUrl}${iconType}-dot.png`;

    // İkon URL'sini belirli bir şarta göre değiştirme (örneğin kendi sunucunuzdaki ikon)
    if (iconType === '00') {
      // @ts-ignore
      iconUrl = `http://192.168.3.75:85${markerList.mapPinIcons[0].url}`;
    } else if (iconType === '01') {
      // @ts-ignore
      iconUrl = `http://192.168.3.75:85${markerList.mapPinIcons[1].url}`;
    }
    // İkon özelliklerini döndürme
    return {
      url: iconUrl,
      scaledSize: new window.google.maps.Size(40, 40),
    };
  };

  useEffect(() => {
    getMarkerList();
  }, []);


  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    // @ts-ignore
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
            // @ts-ignore
            markerList.stations.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lon }}
                // onClick={() => handleMarkerClick(marker)}
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
                  setAddress(null);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '8px' }}>
                    <p style={{ margin: 0 }}>{address || 'Loading address...'}</p>
                  </div>
                  <button onClick={() => setSelectedMarker(null)} style={{ marginLeft: 'auto', fontSize: '20px', fontWeight: 'bolder' }}>
                    X
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
