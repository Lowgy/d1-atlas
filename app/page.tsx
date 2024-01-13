'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { data } from './data/colleges';
import { mapStyle } from './data/map-styles';

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
  logo: string;
};

export default function Home() {
  const { theme, resolvedTheme } = useTheme();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [schoolData, setSchoolData] = useState<College[]>(data);
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
    logo: 'http://a.espncdn.com/i/teamlogos/ncaa/500/155.png',
  });
  const [filter, setFilter] = useState({
    conference: 'all',
    state: 'all',
  });
  const [prevFilter, setPrevFilter] = useState(filter);
  const [schoolSheetOpen, setSchoolSheetOpen] = useState(false);

  const [mapStyles, setMapStyles] = useState(mapStyle['light']);

  const [mapZoom, setMapZoom] = useState(5);
  const [mapCenter, setMapCenter] = useState({
    lat: 40.999436,
    lng: -98.706041,
  });

  const mapOptions = {
    styles: mapStyles,
    disableDefaultUI: true,
    clickableIcons: true,
    scrollwheel: true,
  };

  const handleMarkerClick = (college: any) => {
    console.log(college);
    setSchoolSheetOpen(true);
    setSelectedSchool(college);
    setMapCenter({ lat: college.location.lat, lng: college.location.lng });
    setMapZoom(16);
  };

  const handleFilterChange = ({
    conference,
    state,
  }: {
    conference?: string;
    state?: string;
  }) => {
    setFilter({
      conference: conference || filter.conference,
      state: state || filter.state,
    });
  };

  useEffect(() => {
    setPrevFilter(filter);
    let filteredData = schoolData;

    if (filter.conference !== 'all' && filter.state !== 'all') {
      filteredData = filteredData.filter(
        (college) =>
          college.conference === filter.conference &&
          college.location.state === filter.state
      );
    }
    if (filter.state !== 'all') {
      filteredData = filteredData.filter(
        (college) => college.location.state === filter.state
      );
    }
    if (filter.conference !== 'all') {
      filteredData = filteredData.filter(
        (college) => college.conference === filter.conference
      );
    }

    if (filter.conference === 'all' && filter.state === 'all') {
      filteredData = data;
    }

    if (prevFilter.conference !== 'all' && filter.conference !== 'all') {
      filteredData = data;
      filteredData = filteredData.filter(
        (college) => college.conference === filter.conference
      );
    }
    setSchoolData(filteredData);
    setMapZoom(5);
  }, [filter]);

  useEffect(() => {
    if (resolvedTheme && resolvedTheme === 'dark') {
      //@ts-ignore
      setMapStyles(mapStyle['dark']);
    } else {
      setMapStyles(mapStyle['light']);
    }
  }, [resolvedTheme]);

  return (
    <div>
      {isLoaded && (
        <>
          <Dialog defaultOpen={true}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Welcome to D1 Atlas</DialogTitle>
                <DialogDescription>
                  This is an atlas of all D1 Colleges and Universities. Click on
                  to see information about the school.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* TODO: Make Help Settings button work */}
          <SearchBar
            schoolData={schoolData}
            handleMarkerClick={handleMarkerClick}
            handleFilterChange={handleFilterChange}
          />

          {/* TODO: Make Help button work */}
          <TopRightBar />
          <GoogleMap
            mapContainerStyle={{ height: '100vh', width: '100%' }}
            center={mapCenter}
            zoom={mapZoom}
            options={mapOptions}
          >
            {schoolData.map((college) => (
              <Marker
                key={college.name}
                position={{
                  lat: college.location.lat,
                  lng: college.location.lng,
                }}
                onClick={() => handleMarkerClick(college)}
                icon={{
                  url: `${college.logo}`,
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
              />
            ))}
          </GoogleMap>
        </>
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
