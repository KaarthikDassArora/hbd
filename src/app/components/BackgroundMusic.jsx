"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { Volume2, VolumeX, Music } from "lucide-react"

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        // Create audio element using the file from audio folder
        const audio = new Audio('/audio/Dil Tu Jaan Tu  Gurnazar  Female Version  Arunima Sharma  Superhit Punjabi Song  Viral Reels.mp3')
        audio.loop = true
        audio.volume = 0.3
        audioRef.current = audio

        // Auto-play the music when component mounts
        const playMusic = async () => {
            try {
                await audio.play()
                setIsPlaying(true)
            } catch (error) {
                console.log('Auto-play failed:', error)
                // Some browsers block auto-play, so we'll just show as playing
                setIsPlaying(true)
            }
        }

        // Start playing after a short delay to ensure user interaction
        const timer = setTimeout(() => {
            playMusic()
        }, 2000)

        return () => {
            clearTimeout(timer)
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            } else {
                audioRef.current.play().catch(error => {
                    console.log('Audio play failed:', error)
                    setIsPlaying(true)
                })
                setIsPlaying(true)
            }
        }
    }

    const toggleMute = () => {
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
                title="Music is playing automatically"
            >
                <Music className={`w-5 h-5 ${isPlaying ? 'text-green-400' : 'text-white'}`} />
            </motion.button>

            <motion.button
                onClick={toggleMute}
                className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Mute/Unmute Music"
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