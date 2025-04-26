import Header from '@/components/header'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'
import PropertyForm from './form'

const CreatePage = async () => {

  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <PropertyForm />
    </div>
  )
}

export default CreatePage