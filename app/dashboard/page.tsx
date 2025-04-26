import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import Header from "@/components/header"
import MapWrapper from "@/components/map-wrapper"
import { Properties } from "@/types/property";



export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data: properties } = await supabase.from('properties')
    .select('*')
    .eq('user_id', session?.user.id);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <MapWrapper properties={properties as Properties[]} />
    </div>
  )
}
