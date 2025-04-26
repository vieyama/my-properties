import { Properties } from "@/types/property";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(price);
}

export function filterProperties(properties: Properties[], searchTerm: string): Properties[] {
  const search = searchTerm.toLowerCase().trim();
  if (!search) return properties;

  return properties.filter(property =>
    property?.address.toLowerCase().includes(search) ||
    property?.price.toString().includes(search)
  );
}