'use client';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { data } from './data/colleges';

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const mapCenter = { lat: 40.999436, lng: -98.706041 };
  // const mapStyles = [
  //   { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  //   { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  //   { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  //   {
  //     featureType: 'administrative.locality',
  //     elementType: 'labels.text.fill',
  //     stylers: [{ color: '#d59563' }],
  //   },
  //   {
  //     featureType: 'poi',
  //     elementType: 'labels.text.fill',
  //     stylers: [{ color: '#d59563' }],
  //   },
  //   {
  //     featureType: 'poi.park',
  //     elementType: 'geometry',
  //     stylers: [{ color: '#263c3f' }],
  //   },
  //   {
  //     featureType: 'poi.park',
  //     elementType: 'labels.text.fill',
  //     stylers: [{ color: '#6b9a76' }],
  //   },
  //   {
  //     featureType: 'road',
  //     elementType: 'geometry',
  //     stylers: [{ color: '#38414e' }],
  //   },
  //   {
  //     featureType: 'road',
  //     elementType: 'geometry.stroke',
  //     stylers: [{ color: '#212a37' }],
  //   },
  //   {
  //     featureType: 'road',
  //     elementType: 'labels.text.fill',
  //     stylers: [{ color: '#9ca5b3' }],
  //   },
  //   {
  //     featureType: 'road.highway',
  //     elementType: 'geometry',
  //     stylers: [{ color: '#746855' }],
  //   },
  //   {
  //     featureType: 'road.highway',
  //     elementType: 'geometry.stroke',
  //     stylers: [{ color: '#1f2835' }],
  //   },
  //   {
  //     featureType: 'road.highway',
  //     elementType: 'labels.text.fill',
  //     stylers: [{ color: '#f3d19c' }],
  //   },
  //   {
  //     featureType: 'transit',
  //     elementType: 'geometry',
  //     stylers: [{ color: '#2f3948' }],
  //   },
  //   {
  //     featureType: 'transit.station',
  //     elementType: 'labels.text.fill',
  //     stylers: [{ color: '#d59563' }],
  //   },
  //   {
  //     featureType: 'water',
  //     elementType: 'geometry',
  //     stylers: [{ color: '#17263c' }],
  //   },
  //   {
  //     featureType: 'water',
  //     elementType: 'labels.text.fill',
  //     stylers: [{ color: '#515c6d' }],
  //   },
  //   {
  //     featureType: 'water',
  //     elementType: 'labels.text.stroke',
  //     stylers: [{ color: '#17263c' }],
  //   },
  // ];

  const mapOptions = {
    // styles: mapStyles,
    disableDefaultUI: true,
    clickableIcons: true,
    scrollwheel: true,
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          center={mapCenter}
          zoom={5}
          options={mapOptions}
        >
          {data.map((college) => (
            <Marker
              key={college.id}
              position={{
                lat: college.location.lat,
                lng: college.location.lng,
              }}
              onClick={() => {
                console.log(college);
              }}
            />
          ))}
        </GoogleMap>
      )}
    </>
  );
}
