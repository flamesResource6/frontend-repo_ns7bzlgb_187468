import { useState } from 'react'
import { apiPost } from '../lib/api'

export default function Auth({ role = 'buyer', onSuccess, onBack }) {
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', age: '', gender: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    try {
      setLoading(true)
      setError('')
      if (tab === 'signup') {
        const res = await apiPost('/auth/signup', { role, name: form.name, email: form.email, password: form.password, phone: form.phone || undefined, age: form.age? Number(form.age): undefined, gender: form.gender || undefined })
        if (res.ok) {
          const login = await apiPost('/auth/login', { email: form.email, password: form.password })
          onSuccess(login.user)
        }
      } else {
        const res = await apiPost('/auth/login', { email: form.email, password: form.password })
        onSuccess(res.user)
      }
    } catch (e) {
      setError(JSON.parse(e.message)?.detail || e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800/80 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="text-sm text-white/60 hover:text-white">Back</button>
          <div className="text-white/80 capitalize">{role} account</div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button onClick={()=>setTab('login')} className={`py-2 rounded ${tab==='login'?'bg-white text-slate-900':'bg-white/10'}`}>Login</button>
          <button onClick={()=>setTab('signup')} className={`py-2 rounded ${tab==='signup'?'bg-white text-slate-900':'bg-white/10'}`}>Sign Up</button>
        </div>
        {tab==='signup' && (
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full Name" className="w-full mb-2 px-3 py-2 rounded bg-slate-900/70 border border-white/10" />
        )}
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Gmail ID" className="w-full mb-2 px-3 py-2 rounded bg-slate-900/70 border border-white/10" />
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" className="w-full mb-2 px-3 py-2 rounded bg-slate-900/70 border border-white/10" />
        {tab==='signup' && (
          <>
            <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone (optional)" className="w-full mb-2 px-3 py-2 rounded bg-slate-900/70 border border-white/10" />
            {role==='affiliate' && (
              <div className="grid grid-cols-2 gap-2">
                <input value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="Age" className="w-full mb-2 px-3 py-2 rounded bg-slate-900/70 border border-white/10" />
                <input value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} placeholder="Gender" className="w-full mb-2 px-3 py-2 rounded bg-slate-900/70 border border-white/10" />
              </div>
            )}
          </>
        )}
        {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
        <button disabled={loading} onClick={submit} className="w-full py-2 rounded bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-semibold">{tab==='signup'?'Sign Up':'Login'}</button>
        <div className="text-center mt-3 text-sm text-white/70">
          {tab==='signup'? (
            <button className="underline" onClick={()=>setTab('login')}>Already have an account? Login</button>
          ): (
            <button className="underline" onClick={()=>setTab('signup')}>New here? Create account</button>
          )}
        </div>
      </div>
    </div>
  )
}
