import ProductList from "@/components/product-lists"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ProductsPage = () => {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="">
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
      <ProductList />
    </div>
  )
}

export default ProductsPage
