"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { Volume2, VolumeX, Music } from "lucide-react"

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [audioLoaded, setAudioLoaded] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        console.log('BackgroundMusic component mounted')
        
        // Create audio element
        const audio = new Audio('/audio/Dil Tu Jaan Tu  Gurnazar  Female Version  Arunima Sharma  Superhit Punjabi Song  Viral Reels.mp3')
        audio.loop = true
        audio.volume = 0.3
        audioRef.current = audio

        // Add event listeners
        audio.addEventListener('canplaythrough', () => {
            console.log('Audio loaded successfully')
            setAudioLoaded(true)
        })

        audio.addEventListener('error', (e) => {
            console.error('Audio loading error:', e)
        })

        audio.addEventListener('play', () => {
            console.log('Audio started playing')
            setIsPlaying(true)
        })

        audio.addEventListener('pause', () => {
            console.log('Audio paused')
            setIsPlaying(false)
        })

        // Try to play after user interaction
        const handleUserInteraction = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play().catch(error => {
                    console.log('Play failed on user interaction:', error)
                })
            }
            // Remove event listeners after first interaction
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('touchstart', handleUserInteraction)
        }

        document.addEventListener('click', handleUserInteraction)
        document.addEventListener('touchstart', handleUserInteraction)

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('touchstart', handleUserInteraction)
        }
    }, [])

    const togglePlay = () => {
        console.log('Toggle play clicked, isPlaying:', isPlaying)
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play().catch(error => {
                    console.log('Manual play failed:', error)
                })
            }
        }
    }

    const toggleMute = () => {
        console.log('Toggle mute clicked, isMuted:', isMuted)
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.volume = 0.3
                setIsMuted(false)
            } else {
                audioRef.current.volume = 0
                setIsMuted(true)
            }
        }
    }

    return (
        <motion.div
            className="fixed top-4 right-4 z-50 flex space-x-2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
        >
            <motion.button
                onClick={togglePlay}
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={`Music ${isPlaying ? 'Playing' : 'Paused'} - Click to ${isPlaying ? 'Pause' : 'Play'}`}
            >
                <Music className={`w-5 h-5 ${isPlaying ? 'text-green-400' : 'text-white'}`} />
            </motion.button>

            <motion.button
                onClick={toggleMute}
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={`${isMuted ? 'Unmute' : 'Mute'} Music`}
            >
                {isMuted ? (
                    <VolumeX className="w-5 h-5 text-red-400" />
                ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                )}
            </motion.button>
        </motion.div>
    )
} 