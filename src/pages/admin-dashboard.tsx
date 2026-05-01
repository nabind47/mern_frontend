import { useAuthStore } from "@/store/user.store"
import { Navigate } from "react-router"
import ProductList from "@/components/product-lists"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NavLink } from "react-router"
import NotificationComponent from "@/components/notification-component"

const AdminDashboard = () => {
  const { role } = useAuthStore()

  if (role !== "admin") {
    return <Navigate to="/" replace />
  }

  return (
    <div className="py-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <NotificationComponent isAdmin />
          <NavLink to="/admin/banners">
            <Button variant="outline">Manage Banners</Button>
          </NavLink>
          <NavLink to="/admin/orders">
            <Button variant="outline">Manage Orders</Button>
          </NavLink>
          <NavLink to="/products/create">
            <Button>
              <PlusIcon className="mr-2 size-4" />
              Add Product
            </Button>
          </NavLink>
        </div>
      </div>
      <ProductList />
    </div>
  )
}

export default AdminDashboard
