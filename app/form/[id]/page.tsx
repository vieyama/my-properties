import Header from '@/components/header'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'
import PropertyForm from '../form'

const CreatePage = async ({
  params,
}: {
    params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data } = await supabase.from('properties').select('*').eq('id', id).maybeSingle()

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <PropertyForm property={data} />
    </div>
  )
}

export default CreatePage