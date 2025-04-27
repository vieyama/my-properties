import { PropertiesForm } from "@/types/property";
import api from "./axios";

export const createProperties = async (data: PropertiesForm) => {
  const res = await api.post("/properties", { ...data, price: Number(data.price) });
  return res.data;
};

export const updateProperties = async (id: number, data: PropertiesForm) => {
  const res = await api.put(`/properties/${id}`, data);
  return res.data;
};

export const deleteProperties = async (id: number) => {
  const res = await api.delete(`/properties/${id}`);
  return res.data;
};

export const uploadProperties = async (FormData: FormData) => {
  const res = await api.post('/properties/upload', FormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
