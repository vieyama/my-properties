import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  redirect(session ? "/login" : "/dashboard")
}
