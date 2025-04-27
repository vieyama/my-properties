'use client'

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { X, Loader, MapPin, ImageUpIcon } from 'lucide-react';
import MapSelector from '@/components/map/map-selector';
import { Properties, PropertiesForm } from '@/types/property';
import { addProperties, updateProperties, uploadImage } from '../actions/properties';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface PropertyFormProps {
  property?: Properties | null;
}

export default function PropertyForm({ property }: PropertyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<PropertiesForm>({
    defaultValues: property ? {
      price: property.price,
      address: property.address,
      image_url: property.image_url,
      lat: property.lat,
      lng: property.lng,
    } : {
      price: 0,
      address: '',
      image_url: '',
      lat: 40.758,
      lng: -73.982
    },
  });

  const image_url = watch('image_url');

  useEffect(() => {
    if (property) {
      setValue('price', property.price);
      setValue('address', property.address);
      setValue('image_url', property.image_url);
      setValue('lat', property.lat);
      setValue('lng', property.lng);
    }
  }, [property, setValue]);

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0])
    }
  }

  const handleUpload = async () => {
    setIsUploading(true)
    try {
      const imageUrl = await uploadImage(file as File)
      setValue('image_url', imageUrl);
    } finally {
      setIsUploading(false)
    }
  }

  const onSubmit: SubmitHandler<PropertiesForm> = async (data) => {
    setIsSubmitting(true);
    try {
      if (property?.id) {
        await updateProperties({ ...data, id: property.id });
      } else {
        await addProperties(data);
      }
      setFile(null)
      setIsSubmitting(false);
    } finally {
      router.push('/dashboard');
    }
  };


  return (
    <div className="container max-w-xl mx-auto">
      <div className="flex justify-between items-center p-6 border-b mt-10">
        <h2 className="text-xl font-semibold text-gray-900">
          {property ? 'Edit Property' : 'Add New Property'}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Image
            </label>
            <div>
              <div className="flex items-center gap-3">
                <Input id="picture" type="file" onChange={handleChangeFile} />
                <Button type='button' onClick={handleUpload} disabled={!file}>
                  {isUploading ? <Loader className="w-4 h-4 animate-spin" /> : <ImageUpIcon />}
                  {isUploading ? 'Uploading...' : "Upload"}
                </Button>
              </div>
              <div className="relative text-center py-4 text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or paste the image link
                </span>
              </div>
              <input
                disabled={isUploading}
                type="text"
                {...register('image_url', {
                  required: 'Image URL is required',
                  pattern: {
                    value: /^(https?:\/\/)?.+\.(jpeg|jpg|png|webp|avif)(\?.*)?$/i,
                    message: 'Must be a valid image URL'
                  }
                })}
                placeholder="https://example.com/image.jpg"
                className={`w-full px-3 py-2 border rounded-md ${errors.image_url ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.image_url && (
                <p className="mt-1 text-sm text-red-500">{errors.image_url.message}</p>
              )}
            </div>

            {image_url && (
              <div className="mt-3 relative h-40 rounded-md overflow-hidden">
                <img
                  src={image_url}
                  alt="Property preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              {...register('price', {
                required: 'Price is required',
                min: { value: 1, message: 'Price must be greater than 0' },
              })}
              placeholder="500000"
              className={`w-full px-3 py-2 border rounded-md ${errors.price ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              {...register('address', { required: 'Address is required' })}
              placeholder="123 Main St, City, State ZIP"
              className={`w-full px-3 py-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <button
              type="button"
              onClick={() => setShowMap(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>Select Location on Map</span>
            </button>

            {showMap && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-medium">Select Location</h3>
                    <button
                      type="button"
                      onClick={() => setShowMap(false)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="h-[500px]">
                    <MapSelector
                      initialLocation={{ lat: watch('lat'), lng: watch('lng') }}
                      setValue={setValue}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-2 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Latitude
                </label>
                <input
                  type="text"
                  value={watch('lat').toFixed(6)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Longitude
                </label>
                <input
                  type="text"
                  value={watch('lng').toFixed(6)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            asChild
          >
            <Link href="/dashboard">
              Cancel
            </Link>
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
            {property ? 'Update Property' : 'Add Property'}
          </Button>
        </div>
      </form>
    </div>
  );
}