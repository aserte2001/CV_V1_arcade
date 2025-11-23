import React, { useState } from 'react'
import '../styles/Special.css'
import soundManager from '../utils/soundManager'

const GameOverScreen = ({ onDownload, onClose }) => {
  const [showInsertCoin, setShowInsertCoin] = useState(true)

  const handleInsertCoin = () => {
    soundManager.playCoinSound()
    setShowInsertCoin(false)
    setTimeout(() => {
      if (onDownload) {
        onDownload()
      }
    }, 500)
  }

  const handleClose = () => {
    setShowInsertCoin(true)
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="game-over-screen">
      <div className="game-over-content">
        <div className="game-over-title">
          <span className="neon-text-red">GAME OVER</span>
        </div>
        <div className="game-over-subtitle">
          <span className="neon-text-yellow">INSERT COIN TO CONTINUE</span>
        </div>
        {showInsertCoin ? (
          <button 
            className="insert-coin-button"
            onClick={handleInsertCoin}
          >
            <span className="coin-icon">🪙</span>
            <span className="button-text">INSERT COIN</span>
          </button>
        ) : (
          <div className="download-section">
            <div className="downloading-text">
              <span className="neon-text-cyan">DOWNLOADING...</span>
            </div>
            <button 
              className="download-button"
              onClick={onDownload}
            >
              <span className="button-text">DOWNLOAD PDF</span>
            </button>
          </div>
        )}
        <div className="game-over-footer">
          <button 
            className="close-game-over-button"
            onClick={handleClose}
          >
            <span className="button-text">CLOSE</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOverScreen

