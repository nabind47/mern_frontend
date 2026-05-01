import ProductList from "@/components/product-lists"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NavLink } from "react-router"
import { useAuthStore } from "@/store/user.store"

const ProductsPage = () => {
  const { role } = useAuthStore()

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-center justify-between">
        <div>
          <Select>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {role === "admin" && (
          <NavLink to="/products/create">
            <Button>
              <PlusIcon className="mr-2 size-4" />
              Create Product
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
