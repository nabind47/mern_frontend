import { useParams } from "react-router"
import { useEffect, useState } from "react"
import ProductForm from "@/components/product-form"
import { getProduct, type Product } from "@/api/products"

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return
      try {
        const data = await getProduct(id)
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="py-4">
      <h1 className="mb-4 text-2xl font-bold">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  )
}

export default EditProductPage
