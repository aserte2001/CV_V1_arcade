import React, { useState, useEffect } from 'react'
import '../styles/UI.css'

const CoinStack = ({ age }) => {
  const [coins, setCoins] = useState([])
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    // Animation für Münzstapel
    const coinsArray = []
    for (let i = 0; i < age; i++) {
      coinsArray.push({
        id: i,
        delay: i * 0.05
      })
    }
    setCoins(coinsArray)

    // Zähler-Animation
    let current = 0
    const interval = setInterval(() => {
      current += 0.5
      if (current >= age) {
        current = age
        clearInterval(interval)
      }
      setAnimatedValue(Math.floor(current))
    }, 50)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [age])

  return (
    <div className="coin-stack">
      <div className="coin-stack-label">
        <span className="neon-text-yellow">XP</span>
      </div>
      <div className="coin-stack-container">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="coin"
            style={{
              animationDelay: `${coin.delay}s`,
              bottom: `${coin.id * 8}px`
            }}
          >
            <div className="coin-inner"></div>
          </div>
        ))}
      </div>
      <div className="coin-counter">
        <span className="neon-text-cyan">{animatedValue}</span>
        <span className="label">JAHRE</span>
      </div>
    </div>
  )
}

export default CoinStack

