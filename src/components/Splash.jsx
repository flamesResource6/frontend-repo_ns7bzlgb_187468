import { useEffect, useRef, useState } from 'react'
import Hero from './Hero'

export default function Splash({ onRoute }) {
  const [tapCount, setTapCount] = useState(0)
  const [showAdmin, setShowAdmin] = useState(false)
  const logoRef = useRef()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (tapCount >= 5) {
      setShowAdmin(true)
      setTapCount(0)
    }
  }, [tapCount])

  const handleLogoTap = () => setTapCount(c => c + 1)

  const validateAdmin = () => {
    if (form.email === 'shekharxlr8@gmail.com' && form.password === 'Shekhar_4t7') {
      onRoute('admin')
    } else {
      setError('Invalid admin credentials')
      setTimeout(() => setError(''), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="pt-10 flex flex-col items-center">
        <div onClick={handleLogoTap} ref={logoRef} className="cursor-pointer select-none">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur border border-white/20 flex items-center justify-center shadow-2xl">
            <span className="text-3xl font-semibold">SP</span>
          </div>
          <div className="mt-3 text-center text-white/80">Shopearn Pro</div>
        </div>
      </div>

      <Hero onBuyer={() => onRoute('buyer-auth')} onAffiliate={() => onRoute('affiliate-auth')} onAdmin={() => setShowAdmin(true)} />

      {showAdmin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center p-6">
          <div className="w-full max-w-sm bg-slate-800/80 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Admin Login</h3>
            <div className="space-y-3">
              <input value={form.email} onChange={e=>setForm({ ...form, email:e.target.value })} placeholder="Email" className="w-full px-3 py-2 rounded bg-slate-900/70 border border-white/10" />
              <input type="password" value={form.password} onChange={e=>setForm({ ...form, password:e.target.value })} placeholder="Password" className="w-full px-3 py-2 rounded bg-slate-900/70 border border-white/10" />
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <div className="flex gap-3 pt-2">
                <button onClick={validateAdmin} className="flex-1 px-4 py-2 rounded bg-yellow-400 text-slate-900 font-semibold">Login</button>
                <button onClick={()=>setShowAdmin(false)} className="px-4 py-2 rounded bg-slate-700">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
