"use client";

import React from "react";
import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { Property } from "@/types/property";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XIcon, Bed, Bath, Home } from "lucide-react";

interface PropertyPopupProps {
  property: Property;
  onClose: () => void;
}

const PropertyPopup: React.FC<PropertyPopupProps> = ({ property, onClose }) => {
  return (
    <InfoWindow
      position={{ lat: property.lat, lng: property.lng }}
      onCloseClick={onClose}
    >
      <Card className="w-72 sm:w-80 overflow-hidden border-none shadow-lg">
        <CardHeader className="p-0 relative">
          <div className="relative w-full h-40 overflow-hidden">
            <img
              src={property.imageUrl}
              alt={property.address}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
            onClick={onClose}
          >
            <XIcon className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <span className="text-lg font-bold text-white">
              {formatPrice(property.price)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1 mb-2">
            {property.address}
          </h3>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms} bd</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} ba</span>
            </div>
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </InfoWindow>
  );
};

export default PropertyPopup;