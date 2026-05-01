import api from "."

export interface Product {
    _id: string
    title: string
    description: string
    price: number
    category: string
    stock: number
    owner: {
        _id: string
        name: string
        email: string
    }
    coverImage: string
    createdAt: string
    updatedAt: string
}

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get("/products")
    return response.data
}

export const getProduct = async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`)
    return response.data
}

export const createProduct = async (formData: FormData): Promise<{ id: string }> => {
    const response = await api.post("/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export const updateProduct = async (id: string, formData: FormData): Promise<Product> => {
    const response = await api.patch(`/products/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export const deleteProduct = async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`)
}