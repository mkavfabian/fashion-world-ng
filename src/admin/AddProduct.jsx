
import { useState } from 'react'
import { supabase } from '../lib/supabase'

function AddProduct() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [sizes, setSizes] = useState('')
  const [stock, setStock] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    if (!images.length) {
      setMessage('Please upload at least one product image.')
      return
    }

    if (Number(price) <= 0 || Number(stock) < 0) {
      setMessage('Enter a valid price and stock quantity.')
      return
    }

    setLoading(true)

    try {
      const imageUrls = []

      for (const image of images) {
        const safeName = image.name.replace(/[^a-zA-Z0-9.-]/g, '-')
        const filePath = `${Date.now()}-${Math.random()
          .toString(36).slice(2)}-${safeName}`

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, image)

        if (uploadError) throw uploadError

        const { data } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath)

        imageUrls.push(data.publicUrl)
      }

      const product = {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        category,
        sizes: sizes.split(',').map(size => size.trim()).filter(Boolean),
        stock: Number(stock),
        image_urls: imageUrls,
        is_active: true
      }

      const { error } = await supabase
        .from('products')
        .insert([product])

      if (error) throw error

      setMessage('Product added successfully!')

      setName('')
      setDescription('')
      setPrice('')
      setCategory('')
      setSizes('')
      setStock('')
      setImages([])

      e.target.reset()
    } catch (error) {
      console.error('Product error:', error)
      setMessage(error.message || 'Could not add product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-product-page">
      <h1>Add New Product</h1>
      <p>Upload and manage your Fashion World NG products.</p>

      <form onSubmit={handleSubmit}>
        <label>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter product name"
          required
        />

        <label>Product Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe this product"
          required
        />

        <label>Product Price (₦)</label>
        <input
          type="number"
          min="1"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Enter selling price"
          required
        />

        <label>Category</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="Men">Men's Fashion</option>
          <option value="Women">Women's Fashion</option>
          <option value="Shoes">Shoes</option>
          <option value="Bags">Bags</option>
          <option value="Accessories">Accessories</option>
        </select>

        <label>Available Sizes</label>
        <input
          type="text"
          value={sizes}
          onChange={e => setSizes(e.target.value)}
          placeholder="Example: 38, 39, 40, 41, 42"
        />

        <label>Available Stock</label>
        <input
          type="number"
          min="0"
          value={stock}
          onChange={e => setStock(e.target.value)}
          placeholder="Enter quantity available"
          required
        />

        <label>Product Pictures</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={e => setImages(Array.from(e.target.files || []))}
          required
        />

        {images.length > 0 && (
          <p>{images.length} picture(s) selected</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading Product...' : 'Publish Product'}
        </button>

        {message && <p role="status">{message}</p>}
      </form>
    </div>
  )
}

export default AddProduct
