import Spline from '@splinetool/react-spline'

export default function Hero({ onBuyer, onAffiliate, onAdmin }) {
  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[80vh] bg-gradient-to-b from-slate-900/60 via-slate-900/60 to-slate-900/80 pointer-events-none">
        <div className="px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-semibold text-white tracking-tight mb-4">Shopearn Pro</h1>
          <p className="text-slate-200/90 mb-8">Shop Smart. Earn Smarter.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
            <button onClick={onBuyer} className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-semibold shadow-lg hover:brightness-110 transition">
              Continue as Customer / Buyer
            </button>
            <button onClick={onAffiliate} className="px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur hover:bg-white/20 transition">
              Become an Affiliate Partner
            </button>
            <button onClick={onAdmin} className="px-6 py-3 rounded-full bg-slate-800/70 text-white border border-white/10 hover:bg-slate-700/70 transition">
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
