import axios from "axios";
import { createClient } from "@/utils/supabase/client";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const getToken = async () => {
  const supabase = createClient();
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;
  return token;
};

const refreshToken = async () => {
  const supabase = createClient();
  const session = await supabase.auth.getSession();
  const refreshToken = session.data.session?.refresh_token ?? '';

  const res = await supabase.auth.refreshSession({ refresh_token: refreshToken });
  const newAccessToken = res.data.session?.access_token;
  return newAccessToken;
};

// Request interceptor
api.interceptors.request.use(async (config) => {
  let token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor for handling 401 and refreshing token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshToken();

      if (newToken) {
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
