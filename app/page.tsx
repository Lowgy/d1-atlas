'use client';

import { useState } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  OverlayView,
} from '@react-google-maps/api';
import { data } from './data/colleges';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import SearchBar from '@/components/search-bar';
import TopRightBar from '@/components/top-right-bar';

type College = {
  id: number;
  name: string;
  location: {
    city: string;
    state: string;
    lat: number;
    lng: number;
  };
  mascot: string;
  colors: string[];
  conference: string;
};

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
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

  const [mapCenter, setMapCenter] = useState({
    lat: 40.999436,
    lng: -98.706041,
  });

  const [schoolSheetOpen, setSchoolSheetOpen] = useState(false);
  const [mapZoom, setMapZoom] = useState(5);
  const [selectedSchool, setSelectedSchool] = useState<College>({
    id: 203,
    name: 'North Dakota',
    location: {
      city: 'Grand Forks',
      state: 'North Dakota',
      lat: 47.922891,
      lng: -97.0768014,
    },
    mascot: 'Fighting Hawks',
    colors: ['Green', 'White'],
    conference: 'Summit League',
  });

  const handleMarkerClick = (college: any) => {
    console.log(college);
    setSchoolSheetOpen(true);
    setSelectedSchool(college);
    setMapCenter({ lat: college.location.lat, lng: college.location.lng });
    setMapZoom(16);
  };

  return (
    <div>
      <Dialog defaultOpen={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to D1 Atlas</DialogTitle>
            <DialogDescription>
              This is an atlas of all D1 Colleges and Universities. Click on to
              see information about the school.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* TODO: Add a search bar to filter for a school */}
      <SearchBar data={data} handleMarkerClick={handleMarkerClick} />
      <TopRightBar />
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          center={mapCenter}
          zoom={mapZoom}
          options={mapOptions}
        >
          {data.map((college) => (
            <Marker
              key={college.id}
              position={{
                lat: college.location.lat,
                lng: college.location.lng,
              }}
              onClick={() => handleMarkerClick(college)}
            ></Marker>
          ))}
        </GoogleMap>
      )}
      <Sheet open={schoolSheetOpen} onOpenChange={setSchoolSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedSchool.name}</SheetTitle>
            <SheetDescription>
              <h1>Colors: {selectedSchool.colors.join(', ')}</h1>
              <h1>Mascot: {selectedSchool.mascot}</h1>
              <h1>Conference: {selectedSchool.conference}</h1>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
