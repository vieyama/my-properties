"use client";

import { useState } from "react";
import MapContainer from "@/components/map/map-container";
import { useSearch } from "@/contexts/search-context";
import { filterProperties } from "@/lib/utils";
import { Properties } from "@/types/property";

const MapWrapper = ({ properties }: { properties: Properties[] }) => {
  const { searchTerm } = useSearch();
  const [isLoading] = useState(false)

  const filteredProperties = filterProperties(properties, searchTerm);

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
      <MapContainer apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} properties={filteredProperties} />
    </div>
  );
};

export default MapWrapper;