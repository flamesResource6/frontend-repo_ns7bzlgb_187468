import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../lib/api'

const platforms = ['amazon','flipkart','meesho','shopify','myntra','ajio','alibaba','snapdeal']

export default function AdminDashboard({ onBack }) {
  const [stats, setStats] = useState(null)
  const [links, setLinks] = useState({})
  const [email, setEmail] = useState('shekharxlr8@gmail.com')
  const [password, setPassword] = useState('Shekhar_4t7')
  const [msg, setMsg] = useState('')

  const load = async () => {
    try{
      const s = await apiGet(`/admin/stats?admin_email=${encodeURIComponent(email)}&admin_password=${encodeURIComponent(password)}`)
      setStats(s.stats)
    }catch(e){ setMsg('Auth failed for stats') }
    try{
      const r = await apiGet('/admin/links')
      setLinks(r.links||{})
    }catch(e){ /* ignore */ }
  }

  useEffect(()=>{ load() },[])

  const save = async () => {
    try{
      await apiPost(`/admin/links?admin_email=${encodeURIComponent(email)}&admin_password=${encodeURIComponent(password)}`, { links })
      setMsg('Saved!')
      setTimeout(()=>setMsg(''),1500)
    }catch(e){ setMsg('Save failed') }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <button onClick={onBack} className="px-3 py-2 rounded bg-white/10">Back</button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-white/5 rounded border border-white/10"><div className="text-sm text-white/60">Users</div><div className="text-2xl">{stats?.users ?? '-'}</div></div>
          <div className="p-4 bg-white/5 rounded border border-white/10"><div className="text-sm text-white/60">Buyers</div><div className="text-2xl">{stats?.buyers ?? '-'}</div></div>
          <div className="p-4 bg-white/5 rounded border border-white/10"><div className="text-sm text-white/60">Affiliates</div><div className="text-2xl">{stats?.affiliates ?? '-'}</div></div>
          <div className="p-4 bg-white/5 rounded border border-white/10"><div className="text-sm text-white/60">Subscribers</div><div className="text-2xl">{stats?.subscribers ?? '-'}</div></div>
          <div className="p-4 bg-white/5 rounded border border-white/10"><div className="text-sm text-white/60">Products</div><div className="text-2xl">{stats?.products ?? '-'}</div></div>
          <div className="p-4 bg-white/5 rounded border border-white/10"><div className="text-sm text-white/60">Orders</div><div className="text-2xl">{stats?.orders ?? '-'}</div></div>
        </div>

        <h2 className="mt-8 text-xl font-semibold">Affiliate Link Management</h2>
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          {platforms.map(p=> (
            <div key={p} className="p-3 bg-white/5 rounded border border-white/10">
              <div className="text-xs uppercase text-white/60 mb-1">{p}</div>
              <input value={links[p]||''} onChange={e=>setLinks(prev=>({ ...prev, [p]: e.target.value }))} placeholder={`https://${p}.com/your-affiliate-link`} className="w-full px-3 py-2 rounded bg-slate-900/70 border border-white/10" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-3">
          <button onClick={save} className="px-4 py-2 rounded bg-yellow-400 text-slate-900 font-semibold">Save Links</button>
          {msg && <span className="text-white/80 text-sm">{msg}</span>}
        </div>
      </div>
    </div>
  )
}
