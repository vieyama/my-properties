import { createClient } from "@/utils/supabase/client";

export const createFetcher = (token: string) => async (url: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const error = new Error('An error occurred while fetching the data.');
    (error as any).info = errorBody;
    (error as any).status = res.status;

    // if (res.status === 401) {
    //   const supabase = createClient()
    //   await supabase.auth.signOut()
    //   window.location.href = '/login';
    // }

    throw error;
  }

  return res.json();
};