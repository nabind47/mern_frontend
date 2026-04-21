import ProductList from "@/components/product-lists"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const BANNER_IMAGE = [
  {
    id: "1",
    title: "Discover the Latest Trends in Fashion",
    description:
      "Explore our new collection of stylish and affordable clothing for all occasions. Shop now and elevate your wardrobe with the latest fashion trends.",
    imageUrl: "/banners/1.webp",
  },
  {
    id: "2",
    title: "Discover the Latest Trends in Fashion",
    description:
      "Explore our new collection of stylish and affordable clothing for all occasions. Shop now and elevate your wardrobe with the latest fashion trends.",
    imageUrl: "/banners/2.webp",
  },
]

const HomePage = () => {
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
          {BANNER_IMAGE.map((item) => (
            <CarouselItem key={item.id}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <ProductList />
    </div>
  )
}

export default HomePage
