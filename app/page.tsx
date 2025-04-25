import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold">Next.js 14 with Supabase Auth</h1>
          <p className="mt-3 text-gray-600">A demo application showcasing Magic Link authentication with Supabase</p>
        </div>
        <div className="flex flex-col space-y-4">
          <Button asChild size="lg">
            <Link href="/login">Sign In with Magic Link</Link>
          </Button>
          <p className="text-sm text-gray-500">No password required - just use your email</p>
        </div>
      </div>
    </div>
  )
}
