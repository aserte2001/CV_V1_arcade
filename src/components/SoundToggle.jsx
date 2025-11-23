import React from 'react'
import '../styles/UI.css'

const SoundToggle = ({ isSoundOn, onToggle }) => {
  return (
    <button 
      className={`sound-toggle ${isSoundOn ? 'on' : 'off'}`}
      onClick={onToggle}
      aria-label={isSoundOn ? 'Sound aus' : 'Sound ein'}
    >
      <div className="sound-icon">
        {isSoundOn ? (
          <span className="neon-text-green">♪</span>
        ) : (
          <span className="neon-text-red">♫</span>
        )}
      </div>
      <div className="sound-label">
        <span className="neon-text-yellow">
          {isSoundOn ? 'ON' : 'OFF'}
        </span>
      </div>
    </button>
  )
}

export default SoundToggle

