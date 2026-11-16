
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function AdminDashboard() {
  const [productCount, setProductCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      if (!error) {
        setProductCount(count || 0)
      }

      setLoading(false)
    }

    loadProducts()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/admin'
  }

  return (
    <main className="fwng-admin">
      <aside className="fwng-admin-sidebar">
        <img src="/images/fwng-banner.png" alt="FWNG" />
        <h2>FWNG ADMIN</h2>

        <nav>
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/products">Products</a>
          <a href="/admin/orders">Orders</a>
          <a href="/admin/inventory">Inventory</a>
          <a href="/admin/settings">Settings</a>
        </nav>

        <button onClick={handleLogout}>
          Sign Out
        </button>
      </aside>

      <section className="fwng-admin-content">
        <header>
          <p>FASHION WORLD NG</p>
          <h1>Admin Dashboard</h1>
          <span>Manage your online fashion store.</span>
        </header>

        <div className="fwng-admin-stats">
          <article>
            <span>Total Products</span>
            <h2>{loading ? '...' : productCount}</h2>
          </article>

          <article>
            <span>Store Management</span>
            <h2>Products</h2>
          </article>
        </div>

        <section className="fwng-admin-actions">
          <h2>Product Management</h2>
          <p>Add products, upload pictures and manage your catalogue.</p>

          <a href="/admin/products/new">
            ADD NEW PRODUCT
          </a>
        </section>
      </section>
    </main>
  )
}

export default AdminDashboard
