import { useEffect, useMemo, useState } from 'react'
import { apiGet } from '../lib/api'

const vendors = ['amazon','flipkart','meesho','shopify','myntra','ajio','alibaba','snapdeal']

export default function BuyerHome({ user, onProfile, onOpenCart, onOpenOrders }) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [links, setLinks] = useState({})

  useEffect(() => {
    refresh()
    apiGet('/admin/links').then(r=>setLinks(r.links||{})).catch(()=>{})
  }, [])

  const refresh = async () => {
    const res = await apiGet(`/products?q=${encodeURIComponent(query)}`)
    setItems(res.items || [])
  }

  useEffect(()=>{
    const t = setTimeout(refresh, 300)
    return ()=>clearTimeout(t)
  },[query])

  const openLink = (v) => {
    const url = links[v]
    if (!url) {
      alert('Link not available yet.')
      return
    }
    window.open(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/r/${v}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <img src={user?.photo_url || 'https://i.pravatar.cc/100'} className="w-10 h-10 rounded-full" />
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Products…" className="flex-1 px-4 py-2 rounded bg-white/10" />
          <button onClick={onOpenCart} className="px-3 py-2 rounded bg-white/10">Cart</button>
          <button onClick={onOpenOrders} className="px-3 py-2 rounded bg-white/10">Orders</button>
          <button onClick={onProfile} className="px-3 py-2 rounded bg-white/10">Profile</button>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-3 overflow-x-auto">
          <div className="flex items-center gap-3">
            {vendors.map(v=> (
              <button key={v} onClick={()=>openLink(v)} className="px-3 py-2 rounded bg-white/5 border border-white/10 whitespace-nowrap capitalize">{v}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(p=> (
          <div key={p._id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <img src={p.images?.[0] || 'https://picsum.photos/seed/'+p._id+'/600/400'} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="font-semibold">{p.title}</div>
              <div className="text-yellow-300 mt-1">₹{p.price}</div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs uppercase text-white/60">{p.vendor}</span>
                <a className="px-3 py-1 rounded bg-yellow-400 text-slate-900 text-sm font-semibold" href={`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'}/r/product/${p._id}`} target="_blank">Buy Now</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
