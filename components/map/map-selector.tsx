import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, MapMouseEvent } from '@vis.gl/react-google-maps';
import { Search } from 'lucide-react';
import { UseFormSetValue } from 'react-hook-form';
import { PropertiesForm } from '@/types/property';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
interface MapSelectorProps {
  initialLocation: { lat: number; lng: number };
  setValue: UseFormSetValue<PropertiesForm>
}

export default function MapSelector({ initialLocation, setValue }: MapSelectorProps) {
  const [markerPosition, setMarkerPosition] = useState(initialLocation);

  const handleMapClick = (event: MapMouseEvent) => {
    if (event.detail.latLng) {
      const lat = event.detail.latLng.lat;
      const lng = event.detail.latLng.lng;
      setMarkerPosition({ lat, lng });
      setValue('lat', lat)
      setValue('lng', lng)
    }
  }
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="h-full w-full flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
          </div>
        </div>
        <div className="flex-1">
          <Map
            defaultCenter={initialLocation}
            defaultZoom={13}
            mapId="property-map"
            onClick={handleMapClick}
            clickableIcons={false}
            gestureHandling="greedy"
            disableDefaultUI
            style={{ width: '100%', height: '100%' }}
          >
            <AdvancedMarker className='property-map' position={markerPosition} draggable>
              <Pin background={'#0A84FF'} borderColor={'#0066CC'} glyphColor={'#FFFFFF'} />
            </AdvancedMarker>
          </Map>
        </div>
      </div>
    </APIProvider>
  );
}