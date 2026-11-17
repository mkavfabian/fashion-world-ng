import './App.css'
import { Routes, Route } from 'react-router-dom'

import AdminLogin from './admin/AdminLogin.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import AddProduct from './admin/AddProduct.jsx'
import HomePage from './HomePage.jsx'
import AcceptInvite from './admin/AcceptInvite.jsx'
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/accept-invite" element={<AcceptInvite />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/products/new" element={<AddProduct />} />
    </Routes>
  )
}

export default App