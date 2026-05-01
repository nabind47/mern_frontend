import { getProduct, type Product } from "@/api/products"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart.store"
import { PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return
      try {
        const data = await getProduct(slug)
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [slug])

  if (loading) {
    return <div className="py-4 text-center">Loading product...</div>
  }

  if (!product) {
    return <div className="py-4 text-center">Product not found</div>
  }

  return (
    <div className="mx-auto max-w-4xl py-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <img
            src={`http://localhost:8000${product.coverImage}`}
            alt={product.title}
            className="h-96 w-full rounded-lg object-cover"
          />
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="mt-2 text-2xl font-semibold text-primary">
              NRS {product.price}
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Category: {product.category}
            </p>
            <p className="text-sm text-muted-foreground">
              Stock: {product.stock}
            </p>
          </div>
          <Button
            onClick={() =>
              addItem({
                _id: product._id,
                title: product.title,
                price: product.price,
                coverImage: product.coverImage,
              })
            }
            className="w-full"
          >
            <PlusIcon className="mr-2 size-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
