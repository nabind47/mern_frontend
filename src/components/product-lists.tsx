import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HeartIcon, PlusIcon } from "lucide-react"
import { NavLink } from "react-router"
import { Button } from "./ui/button"

const PRODUCTS = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    description:
      "High-quality over-ear headphones with noise cancellation and 20-hour battery life.",
    image: "https://picsum.photos/seed/headphones/400/400",
    price: 79.99,
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    description:
      "Track your heart rate, steps, and sleep with this sleek waterproof smartwatch.",
    image: "https://picsum.photos/seed/watch/400/400",
    price: 129.99,
  },
  {
    id: 3,
    title: "Gaming Mechanical Keyboard",
    description:
      "RGB backlit mechanical keyboard with blue switches for fast and tactile typing.",
    image: "https://picsum.photos/seed/keyboard/400/400",
    price: 59.99,
  },
  {
    id: 4,
    title: "Portable Bluetooth Speaker",
    description:
      "Compact speaker with deep bass and 12-hour playtime, perfect for outdoor use.",
    image: "https://picsum.photos/seed/speaker/400/400",
    price: 39.99,
  },
  {
    id: 5,
    title: "4K Ultra HD Action Camera",
    description:
      "Capture stunning videos with this waterproof action camera and wide-angle lens.",
    image: "https://picsum.photos/seed/camera/400/400",
    price: 149.99,
  },
  {
    id: 6,
    title: "Ergonomic Office Chair",
    description:
      "Comfortable chair with lumbar support and adjustable height for long working hours.",
    image: "https://picsum.photos/seed/chair/400/400",
    price: 199.99,
  },
  {
    id: 7,
    title: "USB-C Fast Charging Hub",
    description:
      "Multi-port hub with fast charging and data transfer for laptops and smartphones.",
    image: "https://picsum.photos/seed/hub/400/400",
    price: 29.99,
  },
  {
    id: 8,
    title: "Minimalist Leather Wallet",
    description:
      "Slim and stylish wallet made from genuine leather with RFID protection.",
    image: "https://picsum.photos/seed/wallet/400/400",
    price: 24.99,
  },
  {
    id: 9,
    title: "Smart LED Light Bulb",
    description:
      "Control brightness and colors via mobile app or voice assistant.",
    image: "https://picsum.photos/seed/lightbulb/400/400",
    price: 14.99,
  },
  {
    id: 10,
    title: "Laptop Backpack",
    description:
      "Durable backpack with anti-theft design and USB charging port.",
    image: "https://picsum.photos/seed/backpack/400/400",
    price: 49.99,
  },
]

const ProductList = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-4xl">Products</h2>
      <div className="md: grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <div className="relative">
                <NavLink to={`/products/${p.id}`}>
                  <img
                    src={p.image}
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
            <CardFooter>
              <Button>
                <PlusIcon className="size-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProductList
