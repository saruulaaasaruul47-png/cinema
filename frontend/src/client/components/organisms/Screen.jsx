// src/components/organisms/Screen.jsx

export default function Screen() {
  return (
    <div className="flex flex-col items-center mb-8 select-none">
      {/* 3-D perspective screen */}
      <div className="relative w-full max-w-lg">
        {/* Glow behind the screen */}
        <div
          className="absolute -inset-x-4 top-0 h-1 rounded-full blur-xl opacity-60"
          style={{ background: 'linear-gradient(90deg, transparent, #E50914, transparent)' }}
        />

        {/* Screen surface */}
        <div
          className="relative w-full h-8 rounded-b-none overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(200,200,200,0.75) 100%)',
            transform: 'perspective(400px) rotateX(-8deg)',
            boxShadow: '0 4px 32px rgba(229,9,20,0.2), 0 0 60px rgba(229,9,20,0.08), 0 20px 40px rgba(0,0,0,0.8)',
            borderRadius: '4px 4px 0 0',
          }}
        >
          {/* Screen shimmer */}
          <div
            className="absolute inset-0 animate-shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
            }}
          />
        </div>

        {/* Light spread below screen */}
        <div
          className="w-3/4 mx-auto h-12"
          style={{
            background: 'linear-gradient(180deg, rgba(229,9,20,0.06) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Label */}
      <p className="text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase mt-1">
        ── Screen ──
      </p>
    </div>
  )
}
