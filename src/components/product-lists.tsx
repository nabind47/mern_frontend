import { deleteProduct, getProducts, type Product } from "@/api/products"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuthStore } from "@/store/user.store"
import { useCartStore } from "@/store/cart.store"
import { EditIcon, HeartIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import { Button } from "./ui/button"

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { role } = useAuthStore()
  const { addItem } = useCartStore()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      await deleteProduct(id)
      setProducts(products.filter((p) => p._id !== id))
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  if (loading) {
    return <div>Loading products...</div>
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-4xl">Products</h2>
      <div className="md: grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <Card key={p._id}>
            <CardHeader>
              <div className="relative">
                <NavLink to={`/products/${p._id}`}>
                  <img
                    src={`http://localhost:8000${p.coverImage}`}
                    alt={p.title}
                    className="h-full w-full rounded-md"
                  />
                </NavLink>
                <div className="absolute top-2 right-2">
                  <Button size="icon-lg" variant="ghost">
                    <HeartIcon className="size-4" />
                  </Button>
                </div>
              </div>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription className="font-semibold">
                NRS {p.price}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{p.description}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                onClick={() =>
                  addItem({
                    _id: p._id,
                    title: p.title,
                    price: p.price,
                    coverImage: p.coverImage,
                  })
                }
              >
                <PlusIcon className="size-4" /> Add to Cart
              </Button>
              {role === "admin" && (
                <>
                  <NavLink to={`/products/edit/${p._id}`}>
                    <Button variant="outline" size="sm">
                      <EditIcon className="size-4" />
                    </Button>
                  </NavLink>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(p._id)}
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProductList
