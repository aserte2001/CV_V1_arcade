import React, { useEffect, useState } from 'react'
import '../styles/Special.css'
import soundManager from '../utils/soundManager'

const ConfettiExplosion = ({ trigger, message }) => {
  const [particles, setParticles] = useState([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (trigger) {
      setIsActive(true)
      soundManager.playVictorySound()
      
      // Erstelle Confetti-Partikel
      const newParticles = []
      const colors = ['#FF00FF', '#00FFFF', '#FFFF00', '#FF00AA', '#00FF99']
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: -10,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 10 + 5,
          speed: Math.random() * 3 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 10 - 5
        })
      }
      
      setParticles(newParticles)
      
      // Reset nach Animation
      setTimeout(() => {
        setIsActive(false)
        setParticles([])
      }, 3000)
    }
  }, [trigger])

  if (!isActive) return null

  return (
    <div className="confetti-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `confettiFall ${3}s linear forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
            transform: `rotate(${particle.rotation}deg)`,
            boxShadow: `0 0 ${particle.size}px ${particle.color}`
          }}
        />
      ))}
      {message && (
        <div className="confetti-message">
          <span className="neon-text-yellow">{message}</span>
        </div>
      )}
    </div>
  )
}

export default ConfettiExplosion

