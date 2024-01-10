import { useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';

export default function Home() {
  const libraries = useMemo(() => ['places'], []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <div>Map Script Loaded...</div>;
}
