import React from 'react'
import '../styles/Arcade.css'

const ArcadeBackground = () => {
  return (
    <div className="arcade-background">
      {/* Tron-Style Grid Lines */}
      <div className="grid-container">
        <div className="grid-lines horizontal"></div>
        <div className="grid-lines vertical"></div>
        <div className="grid-lines diagonal-1"></div>
        <div className="grid-lines diagonal-2"></div>
      </div>
      
      {/* Flackernde Neon-Schriftzüge */}
      <div className="neon-text-container">
        <div className="neon-text flicker-1">ARCADE</div>
        <div className="neon-text flicker-2">1980</div>
        <div className="neon-text flicker-3">INSERT COIN</div>
        <div className="neon-text flicker-4">HIGH SCORE</div>
      </div>
      
      {/* Zusätzliche Neon-Partikel */}
      <div className="neon-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}></div>
        ))}
      </div>
    </div>
  )
}

export default ArcadeBackground

