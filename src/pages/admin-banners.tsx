import { type Banner, deleteBanner, getAllBanners } from "@/api/banners"
import BannerForm from "@/components/banner-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { EditIcon, TrashIcon } from "lucide-react"
import { useState } from "react"

const AdminBannersPage = () => {
  const queryClient = useQueryClient()
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null)

  const { data: banners, isLoading } = useQuery({
    queryKey: ["admin-banners"],
    queryFn: getAllBanners,
  })

  const handleEdit = (banner: Banner) => {
    setSelectedBanner(banner)
  }

  const handleDelete = async (bannerId: string) => {
    if (!confirm("Delete this banner?")) return
    try {
      await deleteBanner(bannerId)
      queryClient.invalidateQueries({ queryKey: ["admin-banners"] })
    } catch (error) {
      console.error("Failed to delete banner", error)
    }
  }

  const refresh = () => {
    setSelectedBanner(null)
    queryClient.invalidateQueries({ queryKey: ["admin-banners"] })
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Banner Management</h1>
          <p className="text-sm text-muted-foreground">
            Create, edit, and remove homepage banners.
          </p>
        </div>
      </div>

      <BannerForm banner={selectedBanner ?? undefined} onSuccess={refresh} />

      <div className="space-y-4">
        {isLoading ? (
          <div>Loading banners...</div>
        ) : banners?.length ? (
          banners.map((banner) => (
            <Card key={banner._id}>
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>{banner.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {banner.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(banner)}
                  >
                    <EditIcon className="size-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(banner._id)}
                  >
                    <TrashIcon className="size-4" />
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <img
                  src={`http://localhost:8000${banner.imageUrl}`}
                  alt={banner.title}
                  className="w-full rounded-lg object-cover"
                />
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No banners found.</div>
        )}
      </div>
    </div>
  )
}

export default AdminBannersPage
