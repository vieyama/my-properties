"use client";

import React from "react";
import { InfoWindow } from "@vis.gl/react-google-maps";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Edit3Icon, Trash2Icon, XIcon } from "lucide-react";
import { Properties } from "@/types/property";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useProperties } from "@/hooks/useProperties";
import { deleteProperties } from "@/lib/api";

interface PropertyPopupProps {
  property: Properties;
  onClose: () => void;
}

const PropertyPopup: React.FC<PropertyPopupProps> = ({ property, onClose }) => {
  const router = useRouter()
  const { items, isLoading, isError, mutate } = useProperties();

  const onEdit = () => {
    router.push(`/form/${property?.id}`)
  }

  const onDelete = async () => {
    await deleteProperties(property?.id ?? 0);
    mutate();
    onClose()
    router.refresh()
  }

  return (
    <InfoWindow
      position={{ lat: property?.lat ?? 0, lng: property?.lng ?? 0 }}
      headerDisabled
    >
      <img
        src={property?.image_url}
        className="w-full h-full rounded-xl object-cover transition-transform duration-500"
      />
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
          onClick={onEdit}
        >
          <Edit3Icon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
          onClick={onDelete}
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
          onClick={onClose}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute bottom-7 rounded-b-lg bg-slate-950/25 backdrop-blur-sm h-14 flex justify-center items-center w-full text-center">
        <span className="mb-3 text-lg text-white font-normal max-w-[15rem] truncate">{property?.address}</span>
      </div>
      <div className="relative text-center bottom-4 left-0 right-0 rounded-b-lg">
        <span className="text-lg font-bold rounded-3xl bg-white px-5 py-1.5">
          {formatPrice(property?.price ?? 0)}
        </span>
      </div>
    </InfoWindow>
  );
};

export default PropertyPopup;