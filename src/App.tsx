import { Route, Routes } from "react-router"

import AuthLayout from "./layouts/auth-layout"
import MainLayout from "./layouts/main-layout"

import HomePage from "./pages/home"
import LoginPage from "./pages/login"
import ProductsPage from "./pages/products"
import RegisterPage from "./pages/register"

export function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="products">
          <Route index element={<ProductsPage />} />
          <Route path=":slug" element={<h1>Product Details</h1>} />
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
