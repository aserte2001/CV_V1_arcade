import React, { useState, useEffect, useRef } from 'react'
import '../../styles/Game.css'

const PowerUpGame = ({ onScoreUpdate }) => {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState('playing')
  const gameRef = useRef({
    player: { x: 150, y: 250, jumpPower: 0, onGround: true },
    powerUps: [],
    platforms: [
      { x: 0, y: 280, width: 300 },
      { x: 100, y: 200, width: 80 },
      { x: 200, y: 150, width: 80 }
    ],
    gravity: 0.5
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const game = gameRef.current

    // Spawn power-ups
    const spawnPowerUp = () => {
      if (Math.random() < 0.3) {
        game.powerUps.push({
          x: Math.random() * (canvas.width - 20),
          y: -20,
          type: Math.random() < 0.5 ? 'doubleJump' : 'speed',
          collected: false
        })
      }
    }

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw platforms
      game.platforms.forEach(platform => {
        ctx.fillStyle = '#00FFFF'
        ctx.fillRect(platform.x, platform.y, platform.width, 10)
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00FFFF'
        ctx.fillRect(platform.x, platform.y, platform.width, 10)
        ctx.shadowBlur = 0
      })

      // Draw player
      ctx.fillStyle = '#FFFF00'
      ctx.fillRect(game.player.x - 10, game.player.y - 20, 20, 20)
      ctx.shadowBlur = 15
      ctx.shadowColor = '#FFFF00'
      ctx.fillRect(game.player.x - 10, game.player.y - 20, 20, 20)
      ctx.shadowBlur = 0

      // Draw power-ups
      game.powerUps.forEach(powerUp => {
        if (!powerUp.collected) {
          ctx.fillStyle = powerUp.type === 'doubleJump' ? '#FF00FF' : '#00FF99'
          ctx.beginPath()
          ctx.arc(powerUp.x, powerUp.y, 8, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 10
          ctx.shadowColor = powerUp.type === 'doubleJump' ? '#FF00FF' : '#00FF99'
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      // Draw score
      ctx.fillStyle = '#FF00AA'
      ctx.font = '10px "Press Start 2P"'
      ctx.fillText(`SCORE: ${score}`, 10, 20)
    }

    const update = () => {
      if (gameState !== 'playing') return

      // Apply gravity
      game.player.jumpPower += game.gravity
      game.player.y += game.player.jumpPower

      // Check platform collisions
      game.player.onGround = false
      game.platforms.forEach(platform => {
        if (
          game.player.x + 10 >= platform.x &&
          game.player.x - 10 <= platform.x + platform.width &&
          game.player.y >= platform.y - 20 &&
          game.player.y <= platform.y + 10
        ) {
          game.player.y = platform.y - 20
          game.player.jumpPower = 0
          game.player.onGround = true
        }
      })

      // Ground collision
      if (game.player.y >= canvas.height - 20) {
        game.player.y = canvas.height - 20
        game.player.jumpPower = 0
        game.player.onGround = true
      }

      // Update power-ups
      game.powerUps = game.powerUps.filter(powerUp => {
        powerUp.y += 2
        if (
          !powerUp.collected &&
          game.player.x - 10 <= powerUp.x + 8 &&
          game.player.x + 10 >= powerUp.x - 8 &&
          game.player.y - 20 <= powerUp.y + 8 &&
          game.player.y >= powerUp.y - 8
        ) {
          powerUp.collected = true
          setScore(prev => {
            const newScore = prev + 50
            if (onScoreUpdate) onScoreUpdate(newScore)
            return newScore
          })
        }
        return powerUp.y < canvas.height + 20
      })

      // Spawn power-ups
      spawnPowerUp()

      // Game over if player falls
      if (game.player.y > canvas.height) {
        setGameState('gameover')
      }
    }

    const handleKeyPress = (e) => {
      if (gameState !== 'playing') return
      
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault()
        const game = gameRef.current
        if (game.player.onGround || game.player.jumpPower < 0) {
          game.player.jumpPower = -8
          game.player.onGround = false
        }
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const game = gameRef.current
        game.player.x = Math.max(10, game.player.x - 5)
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        const game = gameRef.current
        game.player.x = Math.min(canvas.width - 10, game.player.x + 5)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    const gameLoop = () => {
      update()
      draw()
      if (gameState === 'playing') {
        requestAnimationFrame(gameLoop)
      }
    }

    gameLoop()

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [gameState, score, onScoreUpdate])

  return (
    <div className="power-up-game">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="game-canvas"
      />
      <div className="power-up-instructions">
        <div className="instruction-text">
          SPACE = SPRINGEN | ← → = BEWEGEN
        </div>
      </div>
      {gameState === 'gameover' && (
        <div className="game-over">
          <div className="game-over-text">GAME OVER</div>
          <div className="game-over-score">SCORE: {score}</div>
        </div>
      )}
    </div>
  )
}

export default PowerUpGame

