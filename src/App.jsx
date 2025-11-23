import React, { useState, useEffect, useCallback } from 'react'
import ArcadeBackground from './components/ArcadeBackground'
import ArcadeMachine from './components/ArcadeMachine'
import CoinStack from './components/CoinStack'
import SoundToggle from './components/SoundToggle'
import Guide from './components/Guide'
import StartScreen from './components/StartScreen'
import GameOverScreen from './components/GameOverScreen'
import EasterEgg from './components/EasterEgg'
import ConfettiExplosion from './components/ConfettiExplosion'
import UFO from './components/UFO'
import PongGame from './components/games/PongGame'
import SpaceInvadersGame from './components/games/SpaceInvadersGame'
import ReactionGame from './components/games/ReactionGame'
import { resumeData } from './data/resumeData'
import soundManager from './utils/soundManager'
import './styles/App.css'

const SECTIONS = {
  ABOUT_ME: 0,
  EDUCATION: 1,
  WORK_EXPERIENCE: 2,
  SKILLS: 3,
  LANGUAGES: 4,
  CONTACT: 5
}

const SECTION_NAMES = [
  'ABOUT ME',
  'EDUCATION',
  'WORK EXPERIENCE',
  'SKILLS',
  'LANGUAGES',
  'CONTACT'
]

function App() {
  const [currentSection, setCurrentSection] = useState(null)
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [highscore, setHighscore] = useState(resumeData.highscore || 0)
  const [showGameOver, setShowGameOver] = useState(false)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [confettiTrigger, setConfettiTrigger] = useState(0)
  const [ufoWinTrigger, setUfoWinTrigger] = useState(0)
  const [easterEggSequence, setEasterEggSequence] = useState([])
  const [showGame, setShowGame] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const [showStartScreen, setShowStartScreen] = useState(true)

  // Easter Egg: C-O-N-T-R-O-L
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase()
      const sequence = ['c', 'o', 'n', 't', 'r', 'o', 'l']
      
      setEasterEggSequence(prev => {
        const newSeq = [...prev, key]
        if (newSeq.length > sequence.length) {
          newSeq.shift()
        }
        
        if (newSeq.length === sequence.length && newSeq.join('') === sequence.join('')) {
          setShowEasterEgg(true)
          soundManager.playVictorySound()
          return []
        }
        
        return newSeq
      })
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handleSoundToggle = () => {
    const newSoundState = !isSoundOn
    setIsSoundOn(newSoundState)
    soundManager.setSoundOn(newSoundState)
    // Sound nur abspielen, wenn Sound an ist
    if (newSoundState) {
      soundManager.playButtonClickSound()
    }
  }

  // Hintergrundmusik beim Laden starten
  useEffect(() => {
    if (isSoundOn) {
      soundManager.playBackgroundMusic()
    }
    
    return () => {
      soundManager.stopBackgroundMusic()
    }
  }, [isSoundOn])

  const handleCoinInsert = () => {
    soundManager.playCoinSound()
  }

  const handleScoreUpdate = useCallback((score) => {
    setHighscore(prev => {
      const newScore = prev + score
      if (newScore >= 1000 && prev < 1000) {
        setConfettiTrigger(prev => prev + 1)
      }
      return newScore
    })
  }, [])


  const handleDownload = async () => {
    try {
      soundManager.playButtonClickSound()
      
      // PDF Download - Lade die Datei zuerst als Blob
      const response = await fetch('/Fabian_Grabner_Lebenslauf_SE.pdf', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // Prüfe ob die Antwort wirklich eine PDF ist
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/pdf')) {
        throw new Error('Die Datei ist keine PDF-Datei')
      }
      
      const blob = await response.blob()
      
      // Prüfe ob der Blob gültig ist
      if (!blob || blob.size === 0) {
        throw new Error('Die PDF-Datei ist leer oder beschädigt')
      }
      
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Fabian_Grabner_Lebenslauf_SE.pdf'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      
      // Cleanup nach kurzer Verzögerung
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }, 100)
      
    } catch (error) {
      console.error('Fehler beim Download:', error)
      alert(`Fehler beim Download der PDF-Datei: ${error.message}\n\nBitte stellen Sie sicher, dass die Datei im public-Ordner existiert.`)
      soundManager.playButtonClickSound()
    }
  }

  const GAMES = {
    PONG: 'pong',
    SPACE_INVADERS: 'space_invaders',
    REACTION: 'reaction'
  }

  const GAME_NAMES = {
    [GAMES.PONG]: 'PONG',
    [GAMES.SPACE_INVADERS]: 'SPACE INVADERS',
    [GAMES.REACTION]: 'REACTION'
  }

  const getGameComponent = (gameType) => {
    switch (gameType) {
      case GAMES.PONG:
        return <PongGame onScoreUpdate={handleScoreUpdate} />
      case GAMES.SPACE_INVADERS:
        return <SpaceInvadersGame onScoreUpdate={handleScoreUpdate} />
      case GAMES.REACTION:
        return <ReactionGame onScoreUpdate={handleScoreUpdate} />
      default:
        return null
    }
  }

  const handleGameSelect = (gameType) => {
    if (selectedGame === gameType && showGame) {
      // Spiel schließen, wenn es bereits geöffnet ist
      setShowGame(false)
      setSelectedGame(null)
      soundManager.playBlipSound()
    } else {
      // Spiel öffnen
      setSelectedGame(gameType)
      setShowGame(true)
      soundManager.playCoinSound()
    }
  }

  const handleGameToggle = () => {
    setShowGame(false)
    setSelectedGame(null)
  }

  const renderMachineContent = (section) => {
    if (section === null) {
      return null
    }
    
    switch (section) {
      case SECTIONS.ABOUT_ME:
        return (
          <ArcadeMachine
            title="ABOUT ME"
            subtitle="ÜBER MICH"
            period="2024"
          >
            <div className="machine-content">
              <p>{resumeData.aboutMe}</p>
            </div>
          </ArcadeMachine>
        )
      
      case SECTIONS.EDUCATION:
        return (
          <ArcadeMachine
            title="EDUCATION"
            subtitle="SCHULBILDUNG"
            period="2009-2024"
          >
            <div className="machine-content">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-school">{edu.school}</div>
                  <div className="education-period">{edu.period}</div>
                </div>
              ))}
            </div>
          </ArcadeMachine>
        )
      
      case SECTIONS.WORK_EXPERIENCE:
        return (
          <ArcadeMachine
            title="WORK EXPERIENCE"
            subtitle="ARBEITSERFAHRUNG"
            period="2019-2024"
          >
            <div className="machine-content">
              {resumeData.workExperience.map((work, index) => (
                <div key={index} className="work-item">
                  <div className="work-position">{work.position}</div>
                  <div className="work-company">{work.company}</div>
                  <div className="work-period">{work.period}</div>
                </div>
              ))}
            </div>
          </ArcadeMachine>
        )
      
      case SECTIONS.SKILLS:
        return (
          <ArcadeMachine
            title="SKILLS"
            subtitle="FÄHIGKEITEN"
            period="2024"
          >
            <div className="machine-content">
              {resumeData.skills && resumeData.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  {skill}
                </div>
              ))}
            </div>
          </ArcadeMachine>
        )
      
      case SECTIONS.LANGUAGES:
        return (
          <ArcadeMachine
            title="LANGUAGES"
            subtitle="SPRACHEN"
            period="2024"
          >
            <div className="machine-content">
              {resumeData.languages.map((lang, index) => (
                <div key={index} className="language-item">
                  <div className="language-name">{lang.language}</div>
                  <div className="language-level">{lang.level}</div>
                </div>
              ))}
            </div>
          </ArcadeMachine>
        )
      
      case SECTIONS.CONTACT:
        return (
          <ArcadeMachine
            title="CONTACT"
            subtitle="KONTAKT"
            period="2024"
          >
            <div className="machine-content">
              <div className="contact-item">
                <div className="contact-label">PHONE:</div>
                <div className="contact-value">{resumeData.personal.phone}</div>
              </div>
              <div className="contact-item">
                <div className="contact-label">EMAIL:</div>
                <div className="contact-value">{resumeData.personal.email}</div>
              </div>
              <div className="contact-item">
                <div className="contact-label">GITHUB:</div>
                <div className="contact-value">
                  <a href={resumeData.personal.github} target="_blank" rel="noopener noreferrer" title={resumeData.personal.github}>
                    GitHub ↗
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-label">ADDRESS:</div>
                <div className="contact-value">{resumeData.personal.address}</div>
              </div>
            </div>
          </ArcadeMachine>
        )
      
      default:
        return null
    }
  }

  // Keyboard shortcut to start
  useEffect(() => {
    if (showStartScreen) {
      const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setShowStartScreen(false)
          soundManager.playCoinSound()
        }
      }
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [showStartScreen])

  if (showStartScreen) {
    return <StartScreen onStart={() => setShowStartScreen(false)} />
  }

  return (
    <div className="arcade-app">
      <ArcadeBackground />
      
      {/* UFO Animation mit Foto */}
      <UFO onWin={() => {
        setUfoWinTrigger(prev => prev + 1)
        setConfettiTrigger(prev => prev + 1)
      }} />
      
      {/* UI Elements */}
      <CoinStack age={resumeData.personal.age || 24} />
      <SoundToggle isSoundOn={isSoundOn} onToggle={handleSoundToggle} />
      <Guide />
      
      {/* Navigation Menu - Rechts */}
      <div className="section-navigation">
        <div className="nav-section">
          <div className="nav-label">ABSCHNITTE</div>
          {Object.keys(SECTIONS).map((sectionKey, index) => {
            const isActive = currentSection === index
            return (
              <button
                key={sectionKey}
                className={`nav-button ${isActive ? 'active' : ''}`}
                onClick={() => {
                  // Toggle: Wenn bereits aktiv, schließen; sonst öffnen
                  if (isActive) {
                    setCurrentSection(null)
                    soundManager.playBlipSound()
                  } else {
                    setCurrentSection(index)
                    setShowGame(false)
                    setSelectedGame(null)
                    soundManager.playBlipSound()
                  }
                }}
                title={isActive ? `${SECTION_NAMES[index]} - Klicken zum Schließen` : `${SECTION_NAMES[index]} - Klicken zum Öffnen`}
              >
                <span className="nav-button-text">{SECTION_NAMES[index]}</span>
                {isActive && (
                  <span className="nav-button-indicator">●</span>
                )}
              </button>
            )
          })}
        </div>
        
        <div className="nav-section games-section">
          <div className="nav-label">SPIELE</div>
              {Object.keys(GAMES).map((gameKey) => {
                const gameType = GAMES[gameKey]
                const isActive = selectedGame === gameType && showGame
                return (
                  <button
                    key={gameKey}
                    className={`nav-button game-button ${isActive ? 'game-active' : ''}`}
                    onClick={() => handleGameSelect(gameType)}
                    title={isActive ? `${GAME_NAMES[gameType]} - Klicken zum Schließen` : `${GAME_NAMES[gameType]} - Klicken zum Öffnen`}
                  >
                    <span className="nav-button-text">{GAME_NAMES[gameType]}</span>
                    {isActive && (
                      <span className="nav-button-indicator">▶</span>
                    )}
                  </button>
                )
              })}
        </div>
      </div>

      {/* Main Content */}
      <div className="arcade-machines-container">
        {renderMachineContent(currentSection)}
        
        {/* Game Overlay - außerhalb des Automaten */}
        {showGame && selectedGame && (
          <div className="game-overlay-external">
            <button 
              className="close-game-button-external"
              onClick={handleGameToggle}
              title="Spiel schließen"
            >
              ✕
            </button>
            <div className="game-container-external">
              {getGameComponent(selectedGame)}
            </div>
          </div>
        )}
      </div>
      
      {/* Download Button */}
      <button 
        className="download-cv-button"
        onClick={() => setShowGameOver(true)}
      >
        <span className="button-text">DOWNLOAD CV</span>
      </button>
      
      {/* Special Features */}
      {showGameOver && (
        <GameOverScreen 
          onDownload={handleDownload}
          onClose={() => setShowGameOver(false)}
        />
      )}
      <EasterEgg 
        isActive={showEasterEgg} 
        onClose={() => setShowEasterEgg(false)} 
      />
      <ConfettiExplosion 
        trigger={confettiTrigger} 
        message="LEVEL UP!" 
      />
      {ufoWinTrigger > 0 && (
        <ConfettiExplosion 
          trigger={ufoWinTrigger} 
          message="" 
        />
      )}
    </div>
  )
}

export default App

