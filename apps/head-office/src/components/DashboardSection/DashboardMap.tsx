import React, { useCallback, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api'
import { BRAND_PREFIX } from '../../constants/constants';

const DashboardMap: React.FC = () => {
  const dashboardMapPrefix: string = `${BRAND_PREFIX}-dashboard-map`;
  const libraries: Libraries = ["places"];
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => { mapRef.current = map }, []);

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
        />
      </LoadScript>
    </div>
  )
}

export default DashboardMap;
