import { useCartStore } from "@/store/cart.store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

const CartPage = () => {
  const { items, updateQuantity, removeItem, getTotal, clearCart } =
    useCartStore()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const total = getTotal()

  const handleCheckout = () => {
    navigate("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="py-4 text-center">
        <h1 className="mb-4 text-2xl font-bold">Your Cart is Empty</h1>
        <p className="text-muted-foreground">
          Add some products to get started!
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl py-4">
      <h1 className="mb-4 text-2xl font-bold">Shopping Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.product._id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:8000${item.product.coverImage}`}
                  alt={item.product.title}
                  className="h-20 w-20 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.title}</h3>
                  <p className="text-muted-foreground">
                    NRS {item.product.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity - 1)
                    }
                  >
                    <MinusIcon className="size-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity + 1)
                    }
                  >
                    <PlusIcon className="size-4" />
                  </Button>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    NRS {item.product.price * item.quantity}
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem(item.product._id)}
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Total: NRS {total}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button onClick={handleCheckout} disabled={loading}>
            {loading ? "Processing..." : "Checkout"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
