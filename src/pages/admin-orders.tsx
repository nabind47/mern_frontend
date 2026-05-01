import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import api from "@/api"

interface Order {
  _id: string
  user: {
    _id: string
    name: string
    email: string
  }
  items: Array<{
    product: {
      _id: string
      title: string
      price: number
      coverImage?: string
    }
    quantity: number
    price: number
  }>
  total: number
  status: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: string
}

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/all")
      setOrders(response.data)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status })
      fetchOrders() // Refresh the list
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "confirmed":
        return "bg-blue-500"
      case "shipped":
        return "bg-purple-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return <div className="py-4 text-center">Loading orders...</div>
  }

  return (
    <div className="mx-auto max-w-6xl py-4">
      <h1 className="mb-4 text-2xl font-bold">Order Management</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order._id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">
                    Order #{order._id.slice(-8)}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Customer: {order.user.name} ({order.user.email})
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      updateOrderStatus(order._id, value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-medium">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <img
                          src={
                            item.product?.coverImage
                              ? `http://localhost:8000${item.product.coverImage}`
                              : "/placeholder-image.jpg"
                          }
                          alt={item.product?.title}
                          className="h-12 w-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.product?.title}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item?.quantity} × NRS {item?.price}
                          </p>
                        </div>
                        <p className="font-medium">
                          NRS {item?.price * item?.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">NRS {order?.total}</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-medium">Shipping Address:</h4>
                  <p className="text-sm text-muted-foreground">
                    {order?.shippingAddress?.street},{" "}
                    {order?.shippingAddress?.city},{" "}
                    {order?.shippingAddress?.state}{" "}
                    {order?.shippingAddress?.zipCode},{" "}
                    {order?.shippingAddress?.country}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminOrdersPage
