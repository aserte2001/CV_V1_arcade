import React, { useState, useEffect } from 'react'
import '../styles/Special.css'
import soundManager from '../utils/soundManager'

const EasterEgg = ({ isActive, onClose }) => {
  const [achievementText, setAchievementText] = useState('')
  const [showAchievement, setShowAchievement] = useState(false)

  useEffect(() => {
    if (isActive) {
      soundManager.playVictorySound()
      setShowAchievement(true)
      setAchievementText('HIDDEN ACHIEVEMENT UNLOCKED!')
      
      setTimeout(() => {
        setAchievementText('YOU FOUND THE SECRET LEVEL!')
      }, 2000)
      
      setTimeout(() => {
        setAchievementText('CONGRATULATIONS!')
      }, 4000)
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="easter-egg-overlay">
      <div className="easter-egg-content">
        <div className="secret-level-title">
          <span className="neon-text-magenta">SECRET LEVEL</span>
        </div>
        <div className="achievement-display">
          {showAchievement && (
            <div className="achievement-text">
              <span className="neon-text-yellow">{achievementText}</span>
            </div>
          )}
        </div>
        <div className="secret-content">
          <div className="secret-message">
            <span className="neon-text-cyan">YOU ARE AWESOME!</span>
          </div>
          <div className="secret-message">
            <span className="neon-text-green">KEEP EXPLORING!</span>
          </div>
          <div className="secret-message">
            <span className="neon-text-magenta">NEVER STOP LEARNING!</span>
          </div>
        </div>
        <button 
          className="close-secret-button"
          onClick={onClose}
        >
          <span className="button-text">CLOSE</span>
        </button>
      </div>
    </div>
  )
}

export default EasterEgg

