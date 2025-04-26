"use client";

import React, { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import PropertyMarker from "./property-marker";
import PropertyPopup from "./property-popup";
import { Properties } from "@/types/property";

interface MapContainerProps {
  apiKey: string;
  properties: Properties[];
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
}

const MapContainer: React.FC<MapContainerProps> = ({
  apiKey,
  properties,
  initialCenter = { lat: 40.758, lng: -73.982 },
  initialZoom = 10,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Properties | null>(null);

  const handleMarkerClick = (property: Properties) => {
    setSelectedProperty(property);
  };

  const handleClosePopup = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="relative w-full h-full">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={initialCenter}
          defaultZoom={initialZoom}
          mapId="property-map"
          gestureHandling="greedy"
          disableDefaultUI={true}
          className="w-full h-full"
          clickableIcons={false}
          styles={[
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]}
        >
          {properties?.map((property) => (
            <PropertyMarker
              key={property?.id}
              property={property}
              onClick={() => handleMarkerClick(property)}
              isSelected={selectedProperty?.id === property?.id}
            />
          ))}

          {selectedProperty && (
            <PropertyPopup
              property={selectedProperty}
              onClose={handleClosePopup}
            />
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapContainer;