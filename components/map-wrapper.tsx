"use client";

import { useState, useEffect } from "react";
import MapContainer from "@/components/map/map-container";
import { Card, CardContent } from "@/components/ui/card";
import { MapIcon } from "lucide-react";
import { useSearch } from "@/contexts/search-context";
import { filterProperties } from "@/lib/utils";
import { properties } from "@/lib/property-data";

const MapWrapper = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { searchTerm } = useSearch();

  const filteredProperties = filterProperties(properties, searchTerm);

  useEffect(() => {
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY");
    setIsLoading(false);
  }, []);

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

  if (!apiKey || apiKey === "YOUR_API_KEY") {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="bg-muted p-3 rounded-full">
              <MapIcon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Google Maps API Key Required</h2>
            <p className="text-muted-foreground">
              To use this feature, you need to provide a Google Maps API key.
              Please set the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.
            </p>
            <a
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get a Google Maps API Key
            </a>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <MapContainer apiKey={apiKey} properties={filteredProperties} />
    </div>
  );
};

export default MapWrapper;