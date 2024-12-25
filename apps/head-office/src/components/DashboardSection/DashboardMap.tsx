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

const DashboardMap: React.FC<{ widget: IComponentValueProps }> = ({ widget }) => {
  const dashboardMapPrefix: string = `${BRAND_PREFIX}-dashboard-map`;
  const libraries: Libraries = ['places'];
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Station | null>(null);
  const [address, setAddress] = useState({ address: '', name: '' });
  const [selectedLocations, setSelectedLocations] = useState({
    latitude: 39.92503,
    longitude: 32.83707,
  });
  const [activeTab, setActiveTab] = useState('istasyon');

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

  const setIconUrl = (iconUrl: string) => {
    return iconUrl.replace('http://78.188.179.89:7585', 'https://bo-dev.sharz.net');
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
          <MarkerClusterer
            options={{
              minimumClusterSize: 4
            }}
          >
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
                              // origin: new google.maps.Point(50, 50),
                              // anchor: new google.maps.Point(0, 0),
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
              <div className="bg-white p-4 rounded-lg shadow-md min-w-[200px]">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex space-x-4 border-b w-full">
                    <button
                      className={`pb-2 px-2 ${
                        activeTab === 'istasyon'
                          ? 'border-b-2 border-blue-500 text-blue-500'
                          : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('istasyon')}
                    >
                      İstasyon
                    </button>
                    <button
                      className={`pb-2 px-2 ${
                        activeTab === 'lokasyon'
                          ? 'border-b-2 border-blue-500 text-blue-500'
                          : 'text-gray-500'
                      }`}
                      onClick={() => setActiveTab('lokasyon')}
                    >
                      Lokasyon
                    </button>
                  </div>
                  <button 
                    onClick={() => setSelectedMarker(null)}
                    className="text-gray-500 hover:text-gray-700 ml-2"
                  >
                    <IoCloseCircle size={24} />
                  </button>
                </div>
                
                {activeTab === 'istasyon' && (
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <span className="text-gray-600">Şarj Noktası:</span>
                      <span className="font-medium">{address.name}</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-600">İstasyon Kodu:</span>
                      <span className="font-medium">{selectedMarker.id}</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-600">Kullanım Türü:</span>
                      <span className="font-medium">Halka Açık</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-gray-600">Durum:</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">1 soket kullanıma uygun (Toplam: 2)</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'lokasyon' && (
                  <div className="space-y-2">
                    <div className="flex flex-col">
                      <span className="text-gray-600">Adres:</span>
                      <span className="font-medium">{address.address}</span>
                    </div>
                  </div>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    )
  );
};

export default DashboardMap;
