import React, { useState, useRef, useEffect } from 'react'
import '../styles/UI.css'

const Joystick = ({ onNavigate, currentSection, totalSections }) => {
  const [isActive, setIsActive] = useState(false)
  const [direction, setDirection] = useState(null)
  const joystickRef = useRef(null)

  const handleTouchStart = (e) => {
    e.preventDefault()
    setIsActive(true)
    const touch = e.touches[0]
    const rect = joystickRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = touch.clientX - centerX
    const deltaY = touch.clientY - centerY
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDirection(deltaX > 0 ? 'right' : 'left')
      if (deltaX > 0) {
        onNavigate('next')
      } else {
        onNavigate('prev')
      }
    } else {
      setDirection(deltaY > 0 ? 'down' : 'up')
    }
  }

  const handleTouchEnd = () => {
    setIsActive(false)
    setDirection(null)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') {
      onNavigate('prev')
      setDirection('left')
      setTimeout(() => setDirection(null), 200)
    } else if (e.key === 'ArrowRight') {
      onNavigate('next')
      setDirection('right')
      setTimeout(() => setDirection(null), 200)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className="joystick-container">
      <div className="joystick-label">
        <span className="neon-text-magenta">NAV</span>
      </div>
      <div
        ref={joystickRef}
        className={`joystick ${isActive ? 'active' : ''} ${direction ? `direction-${direction}` : ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          const rect = joystickRef.current.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const deltaX = e.clientX - centerX
          const deltaY = e.clientY - centerY
          
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
              onNavigate('next')
            } else {
              onNavigate('prev')
            }
          }
        }}
      >
        <div className="joystick-base">
          <div className="joystick-stick"></div>
        </div>
        <div className="joystick-buttons">
          <button 
            className="joystick-button button-a"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate('next')
            }}
          >
            A
          </button>
          <button 
            className="joystick-button button-b"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate('prev')
            }}
          >
            B
          </button>
        </div>
      </div>
      <div className="joystick-indicator">
        <span className="neon-text-cyan">
          {currentSection} / {totalSections}
        </span>
      </div>
    </div>
  )
}

export default Joystick

