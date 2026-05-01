import api from "."

export interface OrderItem {
    product: string
    quantity: number
}

export interface ShippingAddress {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
}

export interface CreateOrderData {
    items: OrderItem[]
    shippingAddress: ShippingAddress
}

export const createOrder = async (data: CreateOrderData) => {
    const response = await api.post("/orders", data)
    return response.data
}

export const getUserOrders = async () => {
    const response = await api.get("/orders")
    return response.data
}

export const getAllOrders = async () => {
    const response = await api.get("/orders/all")
    return response.data
}

export const updateOrderStatus = async (orderId: string, status: string) => {
    const response = await api.patch(`/orders/${orderId}/status`, { status })
    return response.data
}

export const getOrder = async (orderId: string) => {
    const response = await api.get(`/orders/${orderId}`)
    return response.data
}