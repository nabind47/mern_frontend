import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createProduct, updateProduct, type Product } from "@/api/products"
import { useNavigate } from "react-router"

interface ProductFormProps {
  product?: Product
  onSuccess?: () => void
}

const ProductForm = ({ product, onSuccess }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  })
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      data.append("title", formData.title)
      data.append("description", formData.description)
      data.append("price", formData.price)
      data.append("category", formData.category)
      data.append("stock", formData.stock)
      if (coverImage) {
        data.append("coverImage", coverImage)
      }

      if (product) {
        await updateProduct(product._id, data)
      } else {
        await createProduct(data)
      }

      onSuccess?.()
      navigate("/products")
    } catch (error) {
      console.error("Error saving product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCoverImage(e.target.files[0])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vegetables">Vegetables</SelectItem>
            <SelectItem value="fruits">Fruits</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input
          id="stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="coverImage">Cover Image</Label>
        <Input
          id="coverImage"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required={!product}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
      </Button>
    </form>
  )
}

export default ProductForm
