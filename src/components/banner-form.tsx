import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { type Banner, createBanner, updateBanner } from "@/api/banners"
import { useNavigate } from "react-router"

interface BannerFormProps {
  banner?: Banner
  onSuccess?: () => void
}

const BannerForm = ({ banner, onSuccess }: BannerFormProps) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (banner) {
      setTitle(banner.title)
      setDescription(banner.description)
      setActive(banner.active)
    }
  }, [banner])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("active", String(active))
      if (image) {
        formData.append("image", image)
      }

      if (banner) {
        await updateBanner(banner._id, formData)
      } else {
        await createBanner(formData)
      }

      onSuccess?.()
      navigate("/admin/banners")
    } catch (error) {
      console.error("Failed to save banner", error)
      alert("Unable to save banner. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="image">Banner Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {banner?.imageUrl && !image && (
          <img
            src={`http://localhost:8000${banner.imageUrl}`}
            alt={banner.title}
            className="mt-3 h-32 w-full rounded object-cover"
          />
        )}
      </div>
      <div className="flex items-center gap-3">
        <input
          id="active"
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="h-4 w-4 rounded border"
        />
        <Label htmlFor="active">Active</Label>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : banner ? "Update Banner" : "Create Banner"}
        </Button>
      </div>
    </form>
  )
}

export default BannerForm
