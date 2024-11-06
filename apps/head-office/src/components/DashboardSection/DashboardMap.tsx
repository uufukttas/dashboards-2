import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript, Libraries } from '@react-google-maps/api';
import { IoCloseCircle } from "react-icons/io5";
import { BRAND_PREFIX } from '../../constants/constants';
import { IComponentValueProps, IMapItemsProps } from './types';

interface Station {
  lat: number;
  lon: number;
  name: string;
  id: number;
  mapIconCode: string;
}

const DashboardMap: React.FC<{ widget: IComponentValueProps }> = ({ widget }: { widget: IComponentValueProps }) => {
  const dashboardMapPrefix: string = `${BRAND_PREFIX}-dashboard-map`;
  const libraries: Libraries = ["places"];
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Station | null>(null);
  const [address, setAddress] = useState({
    address: "",
    name: ""
  });
  const [selectedLocations, setSelectedLocations] =
    useState<{ lat: number, lon: number }>({ lat: 39.92503, lon: 32.83707 });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleMarkerClick = useCallback((marker: IMapItemsProps) => {
    // @ts-expect-error
    setSelectedMarker(marker);
    fetchAddress(marker);
    if (mapRef.current) {
      // @ts-expect-error
      mapRef.current.panTo({ lat: marker.lat, lng: marker.lon });
    }
  }, []);

  const fetchAddress = async (marker: IMapItemsProps) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    // @ts-expect-error
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

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded || !widget.dashboardMapItemDataSummaries) return <div>Loading...</div>;

  return (
    widget.dashboardMapItemDataSummaries && widget.dashboardMapItemDataSummaries.length > 0 && (
      <div className={`${dashboardMapPrefix}-container flex w-full h-full flex-col justify-start w-full px-6 my-4`}>
        <div className={`${BRAND_PREFIX}-map-title-container`}>
          <div className={`${dashboardMapPrefix}-title lg:text-lg font-bold text-md`}>{widget.widgetTitle}</div>
        </div>
        <GoogleMap
          center={{ lat: selectedLocations.lat, lng: selectedLocations.lon }} // Heart of Turkey - Ankara Anitkabir
          mapContainerStyle={{ height: '750px' }}
          mapTypeId="roadmap"
          options={{
            fullscreenControl: false,
            disableDefaultUI: true,
          }}
          zoom={7}
          onLoad={onLoad}
        >
          {
            widget.dashboardMapItemDataSummaries.map((marker, index) => (
              <Marker
                key={index}
                // @ts-ignore
                position={{ lat: Number(marker.latitude), lng: Number(marker.longitude) }}
                onClick={() => {
                  // @ts-ignore
                  handleMarkerClick(marker)
                  // @st-ignore
                  setSelectedLocations({ lat: Number(marker.latitude), lon: Number(marker.longitude) });
                }}
              // icon={setMarkerIcon(marker.mapPinIconCode)} // Özel ikon tipi burada belirleniyor
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
