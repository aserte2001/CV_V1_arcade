import React from 'react'
import '../styles/Machine.css'

const ArcadeMachine = ({ 
  title, 
  subtitle, 
  period, 
  onCoinInsert, 
  children,
  gameComponent 
}) => {

  return (
    <div className="arcade-machine">
      {/* Marquee Text oben */}
      <div className="machine-marquee">
        <div className="marquee-content">
          <span className="marquee-text">{title}</span>
          <span className="marquee-text">{title}</span>
        </div>
      </div>

      {/* Automat-Gehäuse */}
      <div className="machine-body">
        {/* LED-Anzeige für Datum */}
        <div className="machine-led-display">
          <div className="led-screen">
            <span className="led-text">{period || '---'}</span>
          </div>
        </div>

        {/* Bildschirm - Lebenslauf-Inhalt immer sichtbar */}
        <div className="machine-screen">
          <div className="screen-content">
            {subtitle && <div className="screen-subtitle">{subtitle}</div>}
            {children}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ArcadeMachine

