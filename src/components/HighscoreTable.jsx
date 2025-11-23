import React from 'react'
import '../styles/UI.css'

const HighscoreTable = ({ level, highscore }) => {
  return (
    <div className="highscore-table">
      <div className="highscore-header">
        <span className="neon-text-yellow">HIGH SCORE</span>
      </div>
      <div className="highscore-content">
        <div className="highscore-item">
          <span className="label">LEVEL:</span>
          <span className="value neon-text-cyan">{level}</span>
        </div>
        <div className="highscore-item">
          <span className="label">SCORE:</span>
          <span className="value neon-text-magenta">{highscore.toLocaleString()}</span>
        </div>
        <div className="highscore-item">
          <span className="label">RANK:</span>
          <span className="value neon-text-green">SENIOR DEV</span>
        </div>
      </div>
    </div>
  )
}

export default HighscoreTable

