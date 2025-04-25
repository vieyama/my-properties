"use client";

import React from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { Property } from "@/types/property";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyMarkerProps {
  property: Property;
  onClick: () => void;
  isSelected: boolean;
}

const PropertyMarker: React.FC<PropertyMarkerProps> = ({
  property,
  onClick,
  isSelected,
}) => {
  const formattedPrice = formatPrice(property.price);

  return (
    <AdvancedMarker
      position={{ lat: property.lat, lng: property.lng }}
      onClick={onClick}
    >
      <div className="relative">
        <button
          className={`
            relative z-10 rounded-full px-3 py-1 text-sm font-medium text-white shadow-md
            transition-all duration-200 hover:scale-105
            ${isSelected 
              ? "bg-primary scale-110" 
              : "bg-black"}
          `}
        >
          {formattedPrice}
        </button>
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute left-1/2 bottom-0 w-3 h-3 -translate-x-1/2 translate-y-1/2 rotate-45 bg-primary"
            />
          )}
        </AnimatePresence>
      </div>
    </AdvancedMarker>
  );
};

export default PropertyMarker;