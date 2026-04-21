import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container mx-auto flex-1 py-10">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default MainLayout
