import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { LogoutButton } from "@/components/auth/logout-button"
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

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col h-screen">
      <Header user={user} />
      <MapWrapper />
    </div>
    // <div className="max-w-4xl mx-auto p-6">
    //   <div className="flex justify-between items-center mb-8">
    //     <h1 className="text-3xl font-bold">Dashboard</h1>
    //     <LogoutButton />
    //   </div>

    //   <div className="bg-white shadow rounded-lg p-6">
    //     <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}</h2>
    //     <p className="text-gray-600">You have successfully signed in with Supabase Magic Link authentication.</p>

    //     <div className="mt-6 p-4 bg-gray-50 rounded-md">
    //       <h3 className="text-lg font-medium mb-2">Your Account Details</h3>
    //       <div className="grid grid-cols-2 gap-2 text-sm">
            
    //         <div className="font-medium">User ID:</div>
    //         <div className="truncate">{user?.id}</div>
    //         <div className="font-medium">Last Sign In:</div>
    //         <div>{new Date(session?.created_at || "").toLocaleString()}</div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
