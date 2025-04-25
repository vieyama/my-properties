import React, { useState, useCallback, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, MapMouseEvent } from '@vis.gl/react-google-maps';
import { Search } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyC9tW-ZHmkftQEimB29_YvYQTCPm_7uezw';

interface MapSelectorProps {
  initialLocation: { lat: number; lng: number };
  onLocationSelect: (lat: number, lng: number) => void;
}

interface SearchResult {
  description: string;
  place_id: string;
}

export default function MapSelector({ initialLocation, onLocationSelect }: MapSelectorProps) {
  const [markerPosition, setMarkerPosition] = useState(initialLocation);
  const [searchQuery, setSearchQuery] = useState('');
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (window.google && map) {
      setAutocompleteService(new google.maps.places.AutocompleteService());
      setPlacesService(new google.maps.places.PlacesService(map));
    }
  }, [map]);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPosition({ lat, lng });
      onLocationSelect(lat, lng);
    }
  }, [onLocationSelect]);

  const handleSearch = useCallback((query: string) => {
    if (!autocompleteService || !query) {
      setSearchResults([]);
      return;
    }

    autocompleteService.getPlacePredictions(
      { input: query },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSearchResults(predictions.map(prediction => ({
            description: prediction.description,
            place_id: prediction.place_id
          })));
          setShowResults(true);
        }
      }
    );
  }, [autocompleteService]);

  const handleResultSelect = (placeId: string) => {
    if (!placesService) return;

    placesService.getDetails(
      { placeId, fields: ['geometry', 'formatted_address'] },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place && place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          setMarkerPosition({ lat, lng });
          onLocationSelect(lat, lng);
          map?.panTo({ lat, lng });
          map?.setZoom(15);
          setSearchQuery(place.formatted_address || '');
          setShowResults(false);
        }
      }
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch]);

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="h-full w-full flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowResults(true)}
              placeholder="Search for a location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div
                className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                {searchResults.map((result) => (
                  <button
                    key={result.place_id}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    onClick={() => handleResultSelect(result.place_id)}
                  >
                    <p className="text-sm text-gray-700">{result.description}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <Map
            defaultCenter={initialLocation}
            defaultZoom={13}
            mapId="property-map"
            onClick={handleMapClick as unknown as ((event: MapMouseEvent) => void)}
            gestureHandling="greedy"
            disableDefaultUI
            style={{ width: '100%', height: '100%' }}
            // @ts-ignore
            onLoad={(map: React.SetStateAction<google.maps.Map | null>) => setMap(map)}
          >
            <AdvancedMarker position={markerPosition} draggable>
              <Pin background={'#0A84FF'} borderColor={'#0066CC'} glyphColor={'#FFFFFF'} />
            </AdvancedMarker>
          </Map>
        </div>
      </div>
    </APIProvider>
  );
}