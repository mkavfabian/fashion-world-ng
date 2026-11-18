
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function AcceptInvite() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
 const [showPassword, setShowPassword] = useState(false)
async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.updateUser({
      password
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    if (!data.user) {
      setMessage('Could not verify your account. Please open the invitation link again.')
      setLoading(false)
      return
    }

    setMessage('Password created successfully. You can now log in.')
    setLoading(false)

    setTimeout(() => navigate('/admin/login'), 2000)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#090909',
      padding: '20px'
    }}>
      <form onSubmit={handleSubmit} style={{
        width: '100%',
        maxWidth: '420px',
        background: '#151515',
        color: '#F5F0E7',
        padding: '32px',
        borderRadius: '12px'
      }}>
        <h1 style={{ color: '#C5A66A' }}>FWNG Admin Setup</h1>
        <p>Create your administrator password.</p>

        <label>New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={8}
          required
          style={{ width: '100%', padding: '12px', margin: '10px 0 20px' }}
        />
<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  style={{ margin: '5px 0 15px', padding: '8px 16px', cursor: 'pointer' }}
>
  {showPassword ? 'Hide Password' : 'Show Password'}
</button>
        <label>Confirm Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          minLength={8}
          required
          style={{ width: '100%', padding: '12px', margin: '10px 0 20px' }}
        />
<button
  type="button"
  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  disabled={loading}
  style={{
    marginBottom: '15px',
    padding: '8px 15px',
    cursor: 'pointer'
  }}
>
  {showConfirmPassword ? 'Hide Password' : 'Show Password'}
</button>
        <button type="submit" disabled={loading} style={{
          width: '100%',
          padding: '14px',
          background: '#C5A66A',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          {loading ? 'Saving...' : 'Create Password'}
        </button>

        {message && <p role="status">{message}</p>}
      </form>
    </div>
  )
}

export default AcceptInvite
