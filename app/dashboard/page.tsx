import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import Header from "@/components/header"
import MapWrapper from "@/components/map-wrapper"

export default async function DashboardPage() {
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
      <MapWrapper />
    </div>
  )
}
