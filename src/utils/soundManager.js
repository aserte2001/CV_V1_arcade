// Sound Manager für 8-Bit Arcade Sounds
// Erstellt programmatisch 8-Bit Sounds mit Web Audio API

class SoundManager {
  constructor() {
    this.audioContext = null
    this.isSoundOn = true
    this.backgroundMusic = null
    this.isMusicPlaying = false
    this.musicTimeout = null
    this.initAudioContext()
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      console.warn('Web Audio API nicht unterstützt')
    }
  }

  setSoundOn(isOn) {
    this.isSoundOn = isOn
    if (!isOn && this.backgroundMusic) {
      this.stopBackgroundMusic()
    } else if (isOn && !this.isMusicPlaying) {
      this.playBackgroundMusic()
    }
  }

  // Entspannte, angenehme Hintergrundmusik
  playBackgroundMusic() {
    if (!this.isSoundOn || !this.audioContext) return
    if (this.isMusicPlaying) return

    this.isMusicPlaying = true
    
    // Erstelle sanfte, entspannte Töne
    const playNote = (freq, startTime, duration, volume = 0.04, waveType = 'sine', detune = 0) => {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.type = waveType
      oscillator.frequency.setValueAtTime(freq, startTime)
      if (detune !== 0) {
        oscillator.detune.setValueAtTime(detune, startTime)
      }
      
      // Sanftere Attack/Release für entspannten Sound
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.1)
      gainNode.gain.linearRampToValueAtTime(volume, startTime + duration - 0.1)
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration)
      
      oscillator.start(startTime)
      oscillator.stop(startTime + duration)
    }

    // Bass-Linie (tiefe, sanfte Töne)
    const playBass = (freq, startTime, duration) => {
      playNote(freq, startTime, duration, 0.05, 'sine', 0)
    }

    // Melodie (mittlere, sanfte Töne)
    const playMelody = (freq, startTime, duration) => {
      playNote(freq, startTime, duration, 0.04, 'sine', 0)
    }

    // Lead (höhere, sanfte Töne)
    const playLead = (freq, startTime, duration) => {
      playNote(freq, startTime, duration, 0.03, 'sine', 0)
    }

    // Sanfte, entspannte Melodie
    const playPattern = (startTime) => {
      let timeOffset = 0
      
      // Pattern 1: Sanfte Hauptmelodie (langsamer)
      const melody1 = [
        { freq: 330, duration: 0.8 }, // E4
        { freq: 392, duration: 0.8 }, // G4
        { freq: 440, duration: 0.8 }, // A4
        { freq: 392, duration: 0.8 }, // G4
        { freq: 330, duration: 0.8 }, // E4
        { freq: 294, duration: 0.8 }, // D4
        { freq: 330, duration: 1.2 }, // E4
        { freq: 262, duration: 0.8 }, // C4
      ]

      // Bass-Linie (langsamer, sanfter)
      const bassLine = [
        { freq: 165, duration: 1.6 }, // E3
        { freq: 147, duration: 1.6 }, // D3
        { freq: 131, duration: 1.6 }, // C3
        { freq: 147, duration: 1.6 }, // D3
      ]

      // Spiele alle Stimmen gleichzeitig
      melody1.forEach((note, index) => {
        const noteTime = startTime + timeOffset
        playMelody(note.freq, noteTime, note.duration)
        
        // Bass spielt parallel
        if (index < bassLine.length) {
          playBass(bassLine[index].freq, noteTime, bassLine[index].duration)
        }
        
        timeOffset += note.duration
      })
    }

    // Variation für mehr Variation
    const playPattern2 = (startTime) => {
      let timeOffset = 0
      
      const melody2 = [
        { freq: 440, duration: 0.7 }, // A4
        { freq: 494, duration: 0.7 }, // B4
        { freq: 523, duration: 0.7 }, // C5
        { freq: 494, duration: 0.7 }, // B4
        { freq: 440, duration: 0.7 }, // A4
        { freq: 392, duration: 0.7 }, // G4
        { freq: 440, duration: 1.1 }, // A4
        { freq: 330, duration: 0.7 }, // E4
      ]

      const bassLine2 = [
        { freq: 131, duration: 1.4 }, // C3
        { freq: 147, duration: 1.4 }, // D3
        { freq: 165, duration: 1.4 }, // E3
        { freq: 147, duration: 1.4 }, // D3
      ]

      melody2.forEach((note, index) => {
        const noteTime = startTime + timeOffset
        playLead(note.freq, noteTime, note.duration)
        
        if (index < bassLine2.length) {
          playBass(bassLine2[index].freq, noteTime, bassLine2[index].duration)
        }
        
        timeOffset += note.duration
      })
    }

    let patternCount = 0
    const loopMusic = () => {
      if (!this.isMusicPlaying || !this.isSoundOn) {
        if (this.musicTimeout) {
          clearTimeout(this.musicTimeout)
          this.musicTimeout = null
        }
        return
      }
      
      const currentTime = this.audioContext.currentTime
      
      // Wechsle zwischen Pattern 1 und 2 für mehr Variation
      if (patternCount % 2 === 0) {
        playPattern(currentTime)
      } else {
        playPattern2(currentTime)
      }
      
      patternCount++
      
      // Loop nach ~6.4 Sekunden (langsameres, entspannteres Tempo)
      this.musicTimeout = setTimeout(() => {
        if (this.isMusicPlaying && this.isSoundOn) {
          loopMusic()
        }
      }, 6400)
    }

    // Starte die Musik sofort
    if (this.isMusicPlaying && this.isSoundOn) {
      loopMusic()
    }
  }

  stopBackgroundMusic() {
    this.isMusicPlaying = false
    // Stelle sicher, dass alle laufenden Timer gestoppt werden
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout)
      this.musicTimeout = null
    }
  }

  // 8-Bit Coin Sound
  playCoinSound() {
    if (!this.isSoundOn || !this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1)

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.1)
  }

  // 8-Bit Laser Sound
  playLaserSound() {
    if (!this.isSoundOn || !this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.2)

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.2)
  }

  // 8-Bit Game Over Sound
  playGameOverSound() {
    if (!this.isSoundOn || !this.audioContext) return

    const frequencies = [200, 150, 100, 80]
    frequencies.forEach((freq, index) => {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.type = 'square'
      oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime + index * 0.1)

      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime + index * 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + index * 0.1 + 0.2)

      oscillator.start(this.audioContext.currentTime + index * 0.1)
      oscillator.stop(this.audioContext.currentTime + index * 0.1 + 0.2)
    })
  }

  // 8-Bit Victory Sound
  playVictorySound() {
    if (!this.isSoundOn || !this.audioContext) return

    const frequencies = [400, 500, 600, 700, 800]
    frequencies.forEach((freq, index) => {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime + index * 0.05)

      gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime + index * 0.05)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + index * 0.05 + 0.15)

      oscillator.start(this.audioContext.currentTime + index * 0.05)
      oscillator.stop(this.audioContext.currentTime + index * 0.05 + 0.15)
    })
  }

  // 8-Bit Button Click Sound
  playButtonClickSound() {
    if (!this.isSoundOn || !this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.05)

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.05)
  }

  // 8-Bit Power-Up Sound
  playPowerUpSound() {
    if (!this.isSoundOn || !this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3)

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.3)
  }

  // 8-Bit Blip Sound
  playBlipSound() {
    if (!this.isSoundOn || !this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime)

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.05)
  }
}

// Singleton Instance
const soundManager = new SoundManager()

export default soundManager

