"use client";

import MapContainer from "@/components/map/map-container";
import { useSearch } from "@/contexts/search-context";
import { useProperties } from "@/hooks/useProperties";
import { useDebounce } from "use-debounce";

const MapWrapper = () => {
  const { searchTerm } = useSearch();
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const { items, isLoading } = useProperties({ search: debouncedSearch })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <MapContainer apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} properties={items} />
    </div>
  );
};

export default MapWrapper;