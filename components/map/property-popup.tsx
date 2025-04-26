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
      headerDisabled
      className="!overflow-hidden"
    >
      <img
        src={property.imageUrl}
        alt={property.address}
        className="w-full h-full rounded-lg object-cover transition-transform duration-500 hover:scale-105"
      />
      <Button
        size="icon"
        variant="secondary"
        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
        onClick={onClose}
      >
        <XIcon className="h-4 w-4" />
      </Button>
      <div className="relative text-center bottom-4 left-0 right-0">
        <span className="text-lg font-bold rounded-3xl bg-white px-5 py-3">
          {formatPrice(property.price)}
        </span>
      </div>
    </InfoWindow>
  );
};

export default PropertyPopup;