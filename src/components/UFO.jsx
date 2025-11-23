import React, { useState } from 'react'
import '../styles/UFO.css'
import soundManager from '../utils/soundManager'

const UFO = ({ onWin }) => {
  const [showPhoto, setShowPhoto] = useState(false)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const [clickCount, setClickCount] = useState(0)
  const [hasWon, setHasWon] = useState(false)

  const handleUFOClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (hasWon) return // Keine weiteren Klicks nach Gewinn
    
    const newClickCount = clickCount + 1
    setClickCount(newClickCount)
    
    // UFO wird nach jedem Klick 6x schneller
    const newSpeedMultiplier = speedMultiplier * 6
    setSpeedMultiplier(newSpeedMultiplier)
    
    soundManager.playBlipSound()
    
    // Gewinn-Check: 3 Klicks = Gewinn
    if (newClickCount >= 3) {
      setHasWon(true)
      soundManager.playVictorySound()
      if (onWin) {
        onWin()
      }
      // Beim 3. Klick kein Foto anzeigen
      return
    }
    
    // Foto nur bei Klick 1 und 2 anzeigen
    setShowPhoto(true)
    
    // Foto nach 2 Sekunden ausblenden
    setTimeout(() => {
      setShowPhoto(false)
    }, 2000)
  }

  return (
    <>
      <div className="ufo-container">
        <div 
          className={`ufo ${speedMultiplier > 1 ? (hasWon ? 'ufo-won' : 'ufo-fast') : ''}`} 
          onClick={handleUFOClick}
          onMouseDown={handleUFOClick}
          style={{ 
            cursor: hasWon ? 'default' : 'pointer',
            animationDuration: `${30 / speedMultiplier}s`
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleUFOClick(e)
            }
          }}
          title={hasWon ? 'GEWONNEN! 🎉' : `Klicks: ${clickCount}/3`}
        >
          {/* UFO-Kuppel */}
          <div className="ufo-dome">
            <div className="ufo-window">
              <img 
                src="/Fabian.jpg" 
                alt="Fabian Grabner" 
                className="ufo-photo"
                draggable="false"
                onError={(e) => {
                  // Fallback wenn Foto nicht gefunden wird
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <div className="ufo-photo-placeholder" style={{ display: 'none' }}>
                <span className="placeholder-text">FG</span>
              </div>
            </div>
          </div>
          
          {/* UFO-Körper */}
          <div className="ufo-body">
            <div className="ufo-light ufo-light-1"></div>
            <div className="ufo-light ufo-light-2"></div>
            <div className="ufo-light ufo-light-3"></div>
          </div>
          
          {/* UFO-Strahlen */}
          <div className="ufo-beams">
            <div className="beam beam-1"></div>
            <div className="beam beam-2"></div>
            <div className="beam beam-3"></div>
          </div>
        </div>
      </div>

      {/* Großes Foto Overlay */}
      {showPhoto && (
        <div className="photo-overlay" onClick={() => setShowPhoto(false)}>
          <div className="photo-container">
            <img 
              src="/Fabian.jpg" 
              alt="Fabian Grabner" 
              className="large-photo"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="photo-placeholder-large" style={{ display: 'none' }}>
              <span className="placeholder-text-large">FABIAN</span>
            </div>
            {/* Klick-Counter Anzeige */}
            {!hasWon && (
              <div className="click-counter-display">
                <span className="counter-text">{clickCount}/3</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gewinn-Nachricht - außerhalb des Foto-Overlays */}
      {hasWon && (
        <div className="win-message-display">
          <span className="win-text">UFO FLÜCHTET</span>
        </div>
      )}
    </>
  )
}

export default UFO

