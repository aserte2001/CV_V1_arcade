import React, { useState, useRef, useEffect } from 'react'
import '../styles/Guide.css'
import soundManager from '../utils/soundManager'

const Guide = () => {
  const [activePopUp, setActivePopUp] = useState(null)
  const popUpRef = useRef(null)

  const guideItems = [
    {
      id: 'navigation',
      title: 'Navigation',
      content: 'Klicke auf die Buttons oben rechts, um zwischen den Abschnitten zu wechseln. Pfeiltasten (← →) funktionieren auch.'
    },
    {
      id: 'sections',
      title: 'Lebenslauf',
      content: 'ABOUT ME, EDUCATION, WORK EXPERIENCE, SKILLS, LANGUAGES, CONTACT - Alle Informationen sind in den Abschnitten verfügbar. Klicke erneut auf einen Button, um den Abschnitt zu schließen.'
    },
    {
      id: 'games',
      title: 'Spiele',
      content: 'Wähle ein Spiel aus der Liste in der Navigation. Pong, Space Invaders oder Reaction Game stehen zur Verfügung. Klicke erneut auf den Button, um das Spiel zu schließen.'
    },
    {
      id: 'features',
      title: 'Features',
      content: 'Sound Toggle: Rechts unten | Download CV: Unten Mitte | Easter Egg: Drücke C-O-N-T-R-O-L | 24 Jahre: Links zeigt dein Alter'
    }
  ]

  const handleMouseEnter = (id) => {
    setActivePopUp(id)
    soundManager.playBlipSound()
  }

  const handleMouseLeave = () => {
    setActivePopUp(null)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setActivePopUp(null)
      }
    }

    if (activePopUp) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activePopUp])

  return (
    <div className="guide-container" ref={popUpRef}>
      <button 
        className="guide-button"
        onMouseEnter={() => handleMouseEnter('main')}
        onMouseLeave={handleMouseLeave}
        title="Hilfe & Anleitung"
        aria-label="Hilfe öffnen"
      >
        <span className="guide-icon">?</span>
      </button>

      {/* Pop-up für Guide Button */}
      {activePopUp === 'main' && (
        <div className="guide-popup main-popup">
          <div className="popup-header">HILFE</div>
          <div className="popup-content">
            <p>Bewege die Maus über die Buttons für mehr Informationen!</p>
            <div className="popup-items">
              {guideItems.map((item) => (
                <button
                  key={item.id}
                  className="popup-item-button"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onClick={() => handleMouseEnter(item.id)}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pop-ups für einzelne Items */}
      {guideItems.map((item) => (
        activePopUp === item.id && (
          <div 
            key={item.id}
            className="guide-popup item-popup"
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="popup-header">{item.title}</div>
            <div className="popup-content">
              <p>{item.content}</p>
            </div>
          </div>
        )
      ))}
    </div>
  )
}

export default Guide

