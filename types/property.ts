export interface Property {
  id: string;
  price: number;
  lat: number;
  lng: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
}

export interface PropertyDummy {
  id: string;
  price: number;
  address: string;
  imgUrl: string;
  location: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyFormData {
  price: number;
  address: string;
  imgUrl: string;
  location: {
    lat: number;
    lng: number;
  };
}