import Header from '@/components/header'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'
import PropertyForm from './Form'

const CreatePage = async () => {
const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const handleBack = () => {
    console.log('finish');
    
  }
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return (
    <div className="flex flex-col h-screen">
      <Header user={user} />
      <PropertyForm />
    </div>
  )
}

export default CreatePage