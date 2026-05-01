import { useState } from "react"
import { useCartStore } from "@/store/cart.store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router"
import api from "@/api"

const CheckoutPage = () => {
  const { items, getTotal, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })
  const navigate = useNavigate()

  const total = getTotal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress,
      }

      await api.post("/orders", orderData)
      clearCart()
      navigate("/orders")
    } catch (error) {
      console.error("Error placing order:", error)
      alert("Failed to place order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (items.length === 0) {
    return (
      <div className="py-4 text-center">
        <h1 className="mb-4 text-2xl font-bold">Your Cart is Empty</h1>
        <p className="text-muted-foreground">
          Add some products before checkout!
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl py-4">
      <h1 className="mb-4 text-2xl font-bold">Checkout</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product._id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    NRS {item.product.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>NRS {total}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  value={shippingAddress.street}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Placing Order..." : "Place Order"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CheckoutPage
