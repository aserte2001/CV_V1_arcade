import React from 'react'
import '../styles/StartScreen.css'
import soundManager from '../utils/soundManager'

const StartScreen = ({ onStart }) => {
  const handleStart = () => {
    soundManager.playCoinSound()
    onStart()
  }

  return (
    <div className="start-screen">
      <div className="start-screen-content">
        <div className="start-title">
          <h1 className="start-title-main">ARCADE</h1>
          <h2 className="start-title-sub">LEBENSLAUF</h2>
        </div>
        
        <div className="start-welcome">
          <p className="welcome-text">WILLKOMMEN</p>
          <p className="welcome-name">FABIAN GRABNER</p>
        </div>

        <div className="start-instructions">
          <p className="instruction-text">DRÜCKE EINE TASTE</p>
          <p className="instruction-text">ODER KLICKE HIER</p>
        </div>

        <button 
          className="start-button"
          onClick={handleStart}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleStart()
            }
          }}
        >
          START
        </button>

        <div className="start-footer">
          <p className="footer-text">© 2024 FABIAN GRABNER</p>
        </div>
      </div>
    </div>
  )
}

export default StartScreen

