import './App.css'
import Layout from './components/layout/Layout'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './auth/Login'
import Products from './pages/Products'
import CategoryPage from './components/categories/CategoryPage'
import { Toaster } from 'react-hot-toast'
import CartPage from './components/cart/CartPage'
import CheckoutPage from './components/checkout/CheckoutPage'
import OrderSuccess from './components/orders/OrderSuccess'
import OrderDetails from './components/orders/OrderDetails'
import OrdersPage from './components/orders/OrdersPage'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './auth/Register'

function App() {

  return (
    <>
      <Toaster toastOptions={{
        success: {
          style: {
            background: '#dcfce7',
            color: '#065f46',
            border: '1px solid #10b981',
          },
        },
        error: {
          style: {
            background: '#fee2e2',
            color: '#991b1b',
            border: '1px solid #f87171',
          },
        },
      }}  position="top-right" reverseOrder={false} />
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
        <Route index element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>
    </Routes> 
    </>
  );
}

export default App
