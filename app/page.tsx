'use client';

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useMemo } from 'react';

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const mapCenter = { lat: 27.672932021393862, lng: 85.31184012689732 };
  const mapOptions = {
    disableDefaultUI: true,
    clickableIcons: true,
    scrollwheel: false,
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          center={mapCenter}
          zoom={15}
          options={mapOptions}
        />
      )}
    </>
  );
}
