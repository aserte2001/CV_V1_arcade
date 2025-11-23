import React, { useState, useEffect, useRef } from 'react'
import '../../styles/Game.css'

const ReactionGame = ({ onScoreUpdate }) => {
  const [gameState, setGameState] = useState('waiting')
  const [score, setScore] = useState(0)
  const [targetVisible, setTargetVisible] = useState(false)
  const [reactionTime, setReactionTime] = useState(0)
  const timerRef = useRef(null)
  const startTimeRef = useRef(0)

  useEffect(() => {
    if (gameState === 'waiting') {
      // Random delay before showing target
      const delay = Math.random() * 2000 + 1000
      timerRef.current = setTimeout(() => {
        setTargetVisible(true)
        setGameState('ready')
        startTimeRef.current = Date.now()
      }, delay)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [gameState])

  const handleClick = () => {
    if (gameState === 'ready' && targetVisible) {
      const reaction = Date.now() - startTimeRef.current
      setReactionTime(reaction)
      setScore(prev => {
        const newScore = prev + Math.max(0, 1000 - reaction)
        if (onScoreUpdate) onScoreUpdate(newScore)
        return newScore
      })
      setTargetVisible(false)
      setGameState('waiting')
    } else if (gameState === 'ready' && !targetVisible) {
      // Clicked too early
      setGameState('waiting')
      setTargetVisible(false)
    }
  }

  const startGame = () => {
    setGameState('waiting')
    setScore(0)
    setTargetVisible(false)
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault()
        if (gameState === 'ready' && targetVisible) {
          const reaction = Date.now() - startTimeRef.current
          setReactionTime(reaction)
          setScore(prev => {
            const newScore = prev + Math.max(0, 1000 - reaction)
            if (onScoreUpdate) onScoreUpdate(newScore)
            return newScore
          })
          setTargetVisible(false)
          setGameState('waiting')
        } else if (gameState === 'ready' && !targetVisible) {
          setGameState('waiting')
          setTargetVisible(false)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState, targetVisible, onScoreUpdate])

  return (
    <div className="reaction-game">
      <div className="reaction-instructions">
        <div className="instruction-text">
          {gameState === 'waiting' && 'WARTE...'}
          {gameState === 'ready' && targetVisible && 'DRÜCKE SPACE!'}
          {gameState === 'ready' && !targetVisible && 'ZU FRÜH!'}
        </div>
      </div>
      <div 
        className={`reaction-target ${targetVisible ? 'visible' : ''}`}
        onClick={handleClick}
        tabIndex={0}
      >
        {targetVisible && (
          <div className="target-circle">
            <div className="target-inner"></div>
          </div>
        )}
      </div>
      <div className="reaction-score">
        <div className="score-label">SCORE: {score}</div>
        {reactionTime > 0 && (
          <div className="reaction-time">
            REACTION: {reactionTime}ms
          </div>
        )}
      </div>
      <button className="reaction-start-button" onClick={startGame}>
        START
      </button>
    </div>
  )
}

export default ReactionGame

