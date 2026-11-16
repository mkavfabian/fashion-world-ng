
import { useState } from 'react'
import { supabase } from '../lib/supabase'

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profileError || profile?.role !== 'admin') {
        await supabase.auth.signOut()
        throw new Error('You are not authorised to access the admin dashboard.')
      }

      window.location.href = '/admin/dashboard'
    } catch (error) {
      setMessage(error.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <img
          src="/images/fwng-banner.png"
          alt="Fashion World NG"
        />

        <p>FASHION WORLD NG</p>
        <h1>Administrator Login</h1>
        <span>Manage your fashion store</span>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter administrator email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'SIGN IN'}
          </button>

          {message && <p role="alert">{message}</p>}
        </form>
      </div>
    </main>
  )
}

export default AdminLogin
