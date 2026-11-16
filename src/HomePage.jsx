import { supabase } from './lib/supabase'
import { useEffect, useState } from 'react'
function HomePage() {
  const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
 useEffect(() => {
  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setProducts(data)
    }

    setLoading(false)
  }

  fetchProducts()
}, []) 
return (
    <main style={{
      backgroundColor: '#090909',
      color: '#f5f0e7',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <img
        src="/images/fwng-banner.png"
        alt="FWNG Fashion World NG"
        style={{
          width: '100%',
          display: 'block'
        }}
      />

      <section style={{ padding: '60px 20px' }}>
        <h1 style={{ color: '#C5A66A' }}>
          LUXURY. STYLE. ELEGANCE.
        </h1>

        <p>Discover a new standard of fashion.</p>

        <button
  onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
  style={{
    backgroundColor: '#C5A66A',
    color: '#090909',
    padding: '14px 30px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold'
  }}
>
        
          SHOP NOW
        </button>
      </section>
    <section
  id="shop"
  style={{
    padding: '60px 20px',
    minHeight: '500px',
    backgroundColor: '#F5F0E7',
    color: '#090909'
  }}
>
  <h2>OUR COLLECTION</h2>
 {loading ? (
  <p>Loading products...</p>
) : error ? (
  <p>{error}</p>
) : products.length === 0 ? (
  <p>Our collection is coming soon.</p>
) : (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '25px',
    marginTop: '40px'
  }}>
    {products.map((product) => (
      <div key={product.id} style={{
        backgroundColor: '#ffffff',
        color: '#090909',
        padding: '15px',
        borderRadius: '8px',
        textAlign: 'left'
      }}>
        {product.image_urls?.[0] && (
          <img
            src={product.image_urls[0]}
            alt={product.name}
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover'
            }}
          />
        )}

        <h3>{product.name}</h3>
        <p>₦{Number(product.price).toLocaleString()}</p>
        <p>{product.category}</p>
        <p>Sizes: {product.sizes?.join(', ')}</p>
      </div>
    ))}
  </div>
)}
  <p>Discover our exclusive fashion collection.</p>
</section>
    </main>
  )
}

export default HomePage
