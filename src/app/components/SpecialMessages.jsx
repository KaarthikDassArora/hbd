"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Heart, Sparkles, Star, Gift, ArrowRight } from "lucide-react"
import confetti from "canvas-confetti"

export default function SpecialMessages({ onNext }) {
    const [currentCard, setCurrentCard] = useState(0)
    const [isFlipping, setIsFlipping] = useState(false)

    const messages = [
        {
            title: "My Everything",
            message: "You are my everything - my happiness, my strength, my reason to smile every day. Without you, my world would be incomplete. You mean more to me than words can ever express! 💖",
            icon: Heart,
            color: "from-pink-400 to-purple-500",
            bgColor: "from-pink-100 to-purple-100"
        },
        {
            title: "My Heart's Desire",
            message: "Every moment with you feels like a dream come true. You have this incredible way of making my heart skip a beat and filling my soul with pure joy. You are truly my heart's desire! 💕",
            icon: Star,
            color: "from-yellow-400 to-orange-500",
            bgColor: "from-yellow-100 to-orange-100"
        },
        {
            title: "My Perfect Match",
            message: "You are the missing piece that completes my puzzle. Your love, your care, your presence in my life makes everything perfect. You are my perfect match in every way! ✨",
            icon: Sparkles,
            color: "from-blue-400 to-cyan-500",
            bgColor: "from-blue-100 to-cyan-100"
        },
        {
            title: "Forever Yours",
            message: "No matter what life brings, I promise to be forever yours. You are my today, my tomorrow, and my always. My heart beats only for you, and it always will! 💝",
            icon: Gift,
            color: "from-green-400 to-emerald-500",
            bgColor: "from-green-100 to-emerald-100"
        }
    ]

    const handleCardTap = () => {
        if (isFlipping) return // Prevent multiple taps during animation
        
        setIsFlipping(true)
        
        // Trigger confetti
        confetti({
            particleCount: 30,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ff69b4", "#ff1493", "#9370db", "#8a2be2", "#ffd700"],
        })

        // Wait for flip animation, then advance
        setTimeout(() => {
            if (currentCard < messages.length - 1) {
                setCurrentCard(prev => prev + 1)
            } else {
                onNext()
            }
            setIsFlipping(false)
        }, 600)
    }

    const currentMessage = messages[currentCard]
    const IconComponent = currentMessage.icon

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-950/30 via-black to-purple-950/30">
            {/* Heading */}
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4">
                    My Heart's Messages
                </h1>
                <p className="text-lg text-purple-300">
                    Just for you, MERA PYARA BICHUU 💌
                </p>
                <p className="text-sm text-purple-200 mt-2">
                    Tap the card to read my heart's words
                </p>
            </div>

            {/* Interactive Card */}
            <div className="w-full max-w-md mb-8">
                <motion.div
                    key={currentCard}
                    className={`w-full h-80 bg-gradient-to-br ${currentMessage.bgColor} rounded-2xl shadow-2xl border-2 border-white/20 p-6 cursor-pointer relative overflow-hidden`}
                    onClick={handleCardTap}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                        rotateY: isFlipping ? 180 : 0,
                        scale: isFlipping ? 1.1 : 1
                    }}
                    transition={{ 
                        duration: 0.6, 
                        type: "spring",
                        stiffness: 200
                    }}
                    style={{
                        transformStyle: "preserve-3d"
                    }}
                >
                    {/* Card Content */}
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <motion.div
                            className="mb-4"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <IconComponent className={`w-16 h-16 text-transparent bg-clip-text bg-gradient-to-r ${currentMessage.color}`} />
                        </motion.div>

                        <motion.h2
                            className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentMessage.color} mb-4`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {currentMessage.title}
                        </motion.h2>

                        <motion.p
                            className="text-gray-700 text-lg leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {currentMessage.message}
                        </motion.p>

                        {/* Tap indicator */}
                        <motion.div
                            className="absolute bottom-4 right-4 text-gray-500"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <ArrowRight className="w-6 h-6" />
                        </motion.div>
                    </div>

                    {/* Floating elements */}
                    <motion.div
                        className="absolute top-4 right-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles className="w-6 h-6 text-yellow-500" />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-4 left-4"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Heart className="w-6 h-6 text-red-500 fill-current" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center space-x-2 mb-8">
                {messages.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentCard ? 'bg-purple-500 scale-110' : 'bg-purple-300'
                        }`}
                        animate={{
                            scale: index === currentCard ? [1, 1.2, 1] : 1
                        }}
                        transition={{ duration: 0.5, repeat: index === currentCard ? Infinity : 0 }}
                    />
                ))}
            </div>

            {/* Footer Text */}
            <div className="text-white/70 text-center text-sm">
                Card {currentCard + 1} of {messages.length}
            </div>
        </div>
    )
}
