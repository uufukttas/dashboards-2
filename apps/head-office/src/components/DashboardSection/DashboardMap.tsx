import React, { useCallback, useRef, useState } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
  Libraries,
  MarkerClusterer,
} from '@react-google-maps/api';
import { IoCloseCircle } from 'react-icons/io5';
import { BRAND_PREFIX } from '../../constants/constants';
import { IComponentValueProps, IMapItemsProps } from './types';

interface Station {
  latitude: number;
  longitude: number;
  name: string;
  id: number;
  mapIconCode: string;
}

const DashboardMap: React.FC<{ widget: IComponentValueProps }> = ({
  widget,
}) => {
  const dashboardMapPrefix: string = `${BRAND_PREFIX}-dashboard-map`;
  const libraries: Libraries = ['places'];
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Station | null>(null);
  const [address, setAddress] = useState({ address: '', name: '' });
  const [selectedLocations, setSelectedLocations] = useState({
    latitude: 39.92503,
    longitude: 32.83707,
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleMarkerClick = useCallback((marker: IMapItemsProps) => {
    setSelectedMarker(marker as unknown as Station);
    fetchAddress(marker);
    if (mapRef.current) {
      mapRef.current.panTo({
        lat: marker.latitude as unknown as number,
        lng: marker.longitude as unknown as number,
      });
    }
  }, []);

  const fetchAddress = async (marker: IMapItemsProps) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.latitude},${marker.longitude}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      setAddress({
        address: data.results[0].formatted_address,
        name: marker.name,
      });
    } else {
      setAddress({
        address: 'Address not found',
        name: marker.name,
      });
    }
  };
  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded || !widget.dashboardMapItemDataSummaries)
    return <div>Loading...</div>;

  return (
    widget.dashboardMapItemDataSummaries &&
    widget.dashboardMapItemDataSummaries.length > 0 && (
      <div
        className={`${dashboardMapPrefix}-container flex w-full h-full flex-col justify-start w-full px-6 my-4`}
      >
        <div className={`${BRAND_PREFIX}-map-title-container`}>
          <div
            className={`${dashboardMapPrefix}-title lg:text-lg font-bold text-md`}
          >
            {widget.widgetTitle}
          </div>
        </div>
        <GoogleMap
          center={{
            lat: selectedLocations.latitude,
            lng: selectedLocations.longitude,
          }}
          mapContainerStyle={{ height: '750px' }}
          mapTypeId="roadmap"
          options={{
            fullscreenControl: false,
            disableDefaultUI: false,
          }}
          zoom={5.6}
          onLoad={onLoad}
        >
          <MarkerClusterer>
            {(clusterer) => {
              return (
                <div>
                  {widget.dashboardMapItemDataSummaries?.map(
                    (marker, index) => (
                      <Marker
                        key={index}
                        position={{
                          lat: Number(marker.latitude),
                          lng: Number(marker.longitude),
                        }}
                        icon={
                          marker.iconUrl
                            ? {
                                url: marker.iconUrl,
                                scaledSize: new google.maps.Size(50, 50),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(0, 0),
                              }
                            : undefined
                        }
                        clusterer={clusterer}
                        onClick={() => {
                          handleMarkerClick(marker);
                          setSelectedLocations({
                            latitude: Number(marker.latitude),
                            longitude: Number(marker.longitude),
                          });
                        }}
                      />
                    )
                  )}
                </div>
              );
            }}
          </MarkerClusterer>
          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.latitude,
                lng: selectedMarker.longitude,
              }}
              onCloseClick={() => {
                setSelectedMarker(null);
                setSelectedLocations({
                  latitude: selectedMarker.latitude,
                  longitude: selectedMarker.longitude,
                });
                setAddress({ address: '', name: '' });
              }}
            >
              <div
                className={`${dashboardMapPrefix}-information-window-container flex items-start justify-center w-full`}
              >
                <div
                  className={`${dashboardMapPrefix}-information-window-content-container mr-2`}
                >
                  <p
                    className={`${dashboardMapPrefix}-information-window-header font-bold`}
                  >
                    {address.name}
                  </p>
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
    )
  );
};

export default DashboardMap;
