import React, { useState, useEffect, useRef } from 'react'
import '../../styles/Game.css'

const PongGame = ({ onScoreUpdate }) => {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState('playing')
  const gameRef = useRef({
    ball: { x: 150, y: 150, dx: 3, dy: 3 },
    paddle: { x: 130, width: 40 },
    paddleY: 280
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const game = gameRef.current

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw paddle
      ctx.fillStyle = '#00FFFF'
      ctx.fillRect(game.paddle.x, game.paddleY, game.paddle.width, 10)
      ctx.shadowBlur = 15
      ctx.shadowColor = '#00FFFF'
      ctx.fillRect(game.paddle.x, game.paddleY, game.paddle.width, 10)
      ctx.shadowBlur = 0

      // Draw ball
      ctx.fillStyle = '#FFFF00'
      ctx.beginPath()
      ctx.arc(game.ball.x, game.ball.y, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 15
      ctx.shadowColor = '#FFFF00'
      ctx.fill()
      ctx.shadowBlur = 0

      // Draw score
      ctx.fillStyle = '#FF00FF'
      ctx.font = '12px "Press Start 2P"'
      ctx.fillText(`SCORE: ${score}`, 10, 20)
    }

    const update = () => {
      if (gameState !== 'playing') return

      // Move ball
      game.ball.x += game.ball.dx
      game.ball.y += game.ball.dy

      // Bounce off walls
      if (game.ball.x <= 5 || game.ball.x >= canvas.width - 5) {
        game.ball.dx = -game.ball.dx
      }
      if (game.ball.y <= 5) {
        game.ball.dy = -game.ball.dy
      }

      // Bounce off paddle
      if (
        game.ball.y >= game.paddleY - 5 &&
        game.ball.y <= game.paddleY + 15 &&
        game.ball.x >= game.paddle.x &&
        game.ball.x <= game.paddle.x + game.paddle.width
      ) {
        game.ball.dy = -game.ball.dy
        setScore(prev => {
          const newScore = prev + 10
          if (onScoreUpdate) onScoreUpdate(newScore)
          return newScore
        })
      }

      // Ball out of bounds
      if (game.ball.y > canvas.height) {
        setGameState('gameover')
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      game.paddle.x = e.clientX - rect.left - game.paddle.width / 2
      if (game.paddle.x < 0) game.paddle.x = 0
      if (game.paddle.x > canvas.width - game.paddle.width) {
        game.paddle.x = canvas.width - game.paddle.width
      }
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY })
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleTouchMove)

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
      canvas.removeEventListener('touchmove', handleTouchMove)
    }
  }, [gameState, score, onScoreUpdate])

  return (
    <div className="pong-game">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="game-canvas"
      />
      {gameState === 'gameover' && (
        <div className="game-over">
          <div className="game-over-text">GAME OVER</div>
          <div className="game-over-score">FINAL SCORE: {score}</div>
        </div>
      )}
    </div>
  )
}

export default PongGame

