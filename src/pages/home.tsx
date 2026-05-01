import ProductList from "@/components/product-lists"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useQuery } from "@tanstack/react-query"
import { getBanners, type Banner } from "@/api/banners"

const HomePage = () => {
  const { data: banners, isLoading } = useQuery<Banner[]>({
    queryKey: ["banners"],
    queryFn: getBanners,
  })

  return (
    <div className="flex flex-col gap-6">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {isLoading ? (
            <CarouselItem>
              <div className="h-96 w-full bg-muted" />
            </CarouselItem>
          ) : banners?.length ? (
            banners.map((item) => (
              <CarouselItem key={item._id}>
                <img
                  src={`http://localhost:8000${item.imageUrl}`}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <div className="grid h-96 place-items-center bg-muted text-center">
                <p className="text-lg font-semibold">
                  No banners currently available.
                </p>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>

      <ProductList />
    </div>
  )
}

export default HomePage
