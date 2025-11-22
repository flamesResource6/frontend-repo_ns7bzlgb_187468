import { useState } from 'react'
import Splash from './components/Splash'
import Auth from './components/Auth'
import BuyerHome from './components/BuyerHome'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [route, setRoute] = useState('splash')
  const [user, setUser] = useState(null)

  const go = (r) => setRoute(r)

  const onAuthSuccess = (u) => {
    setUser(u)
    if (u.role === 'affiliate') go('affiliate-home')
    else go('buyer-home')
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {route==='splash' && <Splash onRoute={go} />}
      {route==='buyer-auth' && <Auth role="buyer" onSuccess={onAuthSuccess} onBack={()=>go('splash')} />}
      {route==='affiliate-auth' && <Auth role="affiliate" onSuccess={onAuthSuccess} onBack={()=>go('splash')} />}
      {route==='buyer-home' && <BuyerHome user={user} onProfile={()=>{}} onOpenCart={()=>{}} onOpenOrders={()=>{}} />}
      {route==='admin' && <AdminDashboard onBack={()=>go('splash')} />}
    </div>
  )
}

export default App
