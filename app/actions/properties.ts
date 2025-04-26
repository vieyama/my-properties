'use server'

import { Properties, PropertiesForm } from "@/types/property";
import { createClient } from "@/utils/supabase/server"

export const addProperties = async (params: PropertiesForm): Promise<Properties> => {
  const supabase = createClient()
  const { data: dataUser } = await supabase.auth.getUser()
  const { data: properties } = await supabase.from('properties')
    .insert([{ ...params, user_id: dataUser.user?.id }])
    .select();

  return properties as Properties
}

export const updateProperties = async (params: PropertiesForm): Promise<Properties> => {
  const supabase = createClient()

  const { data: properties } = await supabase.from('properties')
    .update(params).eq('id', params.id)
    .select();

  return properties as Properties
}

export const deleteProperties = async (id: number): Promise<Properties> => {
  const supabase = createClient()

  const { data: properties } = await supabase.from('properties')
    .delete().eq('id', id)
    .select();

  return properties as Properties
}