import { Database } from "@/types/supabase";

export type Properties = Database['public']['Tables']['properties']['Row'] | null

export type PropertiesForm = Database['public']['Tables']['properties']['Insert']