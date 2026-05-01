import { Route, Routes } from "react-router"

import AuthLayout from "./layouts/auth-layout"
import MainLayout from "./layouts/main-layout"

import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import ProductsPage from "./pages/products"
import RegisterPage from "./pages/register"
import CreateProductPage from "./pages/create-product"
import EditProductPage from "./pages/edit-product"
import AdminDashboard from "./pages/admin-dashboard"
import CartPage from "./pages/cart"
import CheckoutPage from "./pages/checkout"
import OrdersPage from "./pages/orders"
import AdminOrdersPage from "./pages/admin-orders"
import AdminBannersPage from "./pages/admin-banners"
import ProductDetailPage from "./pages/product-detail"

export function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/banners" element={<AdminBannersPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="admin/orders" element={<AdminOrdersPage />} />

        <Route path="products">
          <Route index element={<ProductsPage />} />
          <Route path="create" element={<CreateProductPage />} />
          <Route path="edit/:id" element={<EditProductPage />} />
          <Route path=":slug" element={<ProductDetailPage />} />
        </Route>

        <Route path="blogs">
          <Route index element={<h1>Blogs</h1>} />
          <Route path="create" element={<h1>Create</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
          <Route path=":slug" element={<h1>Details</h1>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
