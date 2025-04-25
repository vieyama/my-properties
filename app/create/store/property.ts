import { PropertyDummy, PropertyFormData } from '@/types/property';
import { create } from 'zustand';

interface PropertyState {
  properties: PropertyDummy[];
  selectedProperty: PropertyDummy | null;
  isLoading: boolean;
  error: string | null;
  addProperty: (property: PropertyFormData) => void;
  updateProperty: (id: string, property: PropertyFormData) => void;
  deleteProperty: (id: string) => void;
  setSelectedProperty: (property: PropertyDummy | null) => void;
}

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [
    {
      id: '1',
      price: 550000,
      address: '123 Main St, San Francisco, CA 94105',
      imgUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      location: {
        lat: 37.7749,
        lng: -122.4194,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      price: 850000,
      address: '456 Market St, San Francisco, CA 94103',
      imgUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      location: {
        lat: 37.7899,
        lng: -122.4014,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      price: 1250000,
      address: '789 Valencia St, San Francisco, CA 94110',
      imgUrl: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      location: {
        lat: 37.7583,
        lng: -122.4212,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  selectedProperty: null,
  isLoading: false,
  error: null,

  addProperty: (propertyData) => {
    const newProperty: PropertyDummy = {
      id: Date.now().toString(),
      ...propertyData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      properties: [...state.properties, newProperty],
    }));
  },

  updateProperty: (id, propertyData) => {
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === id
          ? {
            ...property,
            ...propertyData,
            updatedAt: new Date()
          }
          : property
      ),
      selectedProperty: state.selectedProperty?.id === id
        ? { ...state.selectedProperty, ...propertyData, updatedAt: new Date() }
        : state.selectedProperty
    }));
  },

  deleteProperty: (id) => {
    set((state) => ({
      properties: state.properties.filter((property) => property.id !== id),
      selectedProperty: state.selectedProperty?.id === id ? null : state.selectedProperty,
    }));
  },

  setSelectedProperty: (property) => {
    set({ selectedProperty: property });
  },
}));