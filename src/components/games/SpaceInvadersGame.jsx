import React, { useState, useEffect, useRef } from 'react'
import '../../styles/Game.css'

const SpaceInvadersGame = ({ onScoreUpdate }) => {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState('playing')
  const gameRef = useRef({
    player: { x: 150, y: 280 },
    bullets: [],
    enemies: [],
    enemyDirection: 1
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const game = gameRef.current

    // Initialize enemies
    if (game.enemies.length === 0) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 5; col++) {
          game.enemies.push({
            x: col * 50 + 25,
            y: row * 30 + 50,
            alive: true
          })
        }
      }
    }

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw player
      ctx.fillStyle = '#00FF99'
      ctx.fillRect(game.player.x - 15, game.player.y, 30, 10)
      ctx.shadowBlur = 15
      ctx.shadowColor = '#00FF99'
      ctx.fillRect(game.player.x - 15, game.player.y, 30, 10)
      ctx.shadowBlur = 0

      // Draw bullets
      game.bullets.forEach(bullet => {
        ctx.fillStyle = '#FFFF00'
        ctx.fillRect(bullet.x - 2, bullet.y, 4, 8)
        ctx.shadowBlur = 10
        ctx.shadowColor = '#FFFF00'
        ctx.fillRect(bullet.x - 2, bullet.y, 4, 8)
        ctx.shadowBlur = 0
      })

      // Draw enemies
      game.enemies.forEach(enemy => {
        if (enemy.alive) {
          ctx.fillStyle = '#FF00FF'
          ctx.fillRect(enemy.x - 10, enemy.y, 20, 15)
          ctx.shadowBlur = 10
          ctx.shadowColor = '#FF00FF'
          ctx.fillRect(enemy.x - 10, enemy.y, 20, 15)
          ctx.shadowBlur = 0
        }
      })

      // Draw score
      ctx.fillStyle = '#00FFFF'
      ctx.font = '10px "Press Start 2P"'
      ctx.fillText(`SCORE: ${score}`, 10, 20)
    }

    const update = () => {
      if (gameState !== 'playing') return

      // Move bullets
      game.bullets = game.bullets.filter(bullet => {
        bullet.y -= 5
        return bullet.y > 0
      })

      // Move enemies
      let shouldMoveDown = false
      game.enemies.forEach(enemy => {
        if (enemy.alive) {
          enemy.x += game.enemyDirection * 0.5
          if (enemy.x <= 10 || enemy.x >= canvas.width - 10) {
            shouldMoveDown = true
          }
        }
      })

      if (shouldMoveDown) {
        game.enemyDirection = -game.enemyDirection
        game.enemies.forEach(enemy => {
          if (enemy.alive) enemy.y += 10
        })
      }

      // Check collisions
      game.bullets.forEach((bullet, bi) => {
        game.enemies.forEach((enemy, ei) => {
          if (
            enemy.alive &&
            bullet.x >= enemy.x - 10 &&
            bullet.x <= enemy.x + 10 &&
            bullet.y >= enemy.y &&
            bullet.y <= enemy.y + 15
          ) {
            enemy.alive = false
            game.bullets.splice(bi, 1)
            setScore(prev => {
              const newScore = prev + 20
              if (onScoreUpdate) onScoreUpdate(newScore)
              return newScore
            })
          }
        })
      })

      // Check if all enemies defeated
      if (game.enemies.every(e => !e.alive)) {
        setGameState('victory')
      }

      // Check if enemies reached player
      if (game.enemies.some(e => e.alive && e.y >= game.player.y)) {
        setGameState('gameover')
      }

    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      game.player.x = e.clientX - rect.left
      if (game.player.x < 15) game.player.x = 15
      if (game.player.x > canvas.width - 15) {
        game.player.x = canvas.width - 15
      }
    }

    const handleClick = () => {
      game.bullets.push({
        x: game.player.x,
        y: game.player.y
      })
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY })
    }

    const handleTouchEnd = (e) => {
      e.preventDefault()
      handleClick()
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('touchmove', handleTouchMove)
    canvas.addEventListener('touchend', handleTouchEnd)

    const gameLoop = () => {
      update()
      draw()
      if (gameState === 'playing') {
        requestAnimationFrame(gameLoop)
      }
    }

    gameLoop()

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
    }
  }, [gameState, score, onScoreUpdate])

  return (
    <div className="space-invaders-game">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="game-canvas"
      />
      {gameState === 'gameover' && (
        <div className="game-over">
          <div className="game-over-text">GAME OVER</div>
          <div className="game-over-score">SCORE: {score}</div>
        </div>
      )}
      {gameState === 'victory' && (
        <div className="game-victory">
          <div className="game-victory-text">VICTORY!</div>
          <div className="game-victory-score">SCORE: {score}</div>
        </div>
      )}
    </div>
  )
}

export default SpaceInvadersGame

