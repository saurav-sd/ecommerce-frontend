import './App.css'
import Layout from './components/layout/Layout'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './auth/Login'
import Products from './pages/Products'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Protected route example */}

      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
      </Route>
      {/* Add more routes here as needed */}
    </Routes>
  );
}

export default App
