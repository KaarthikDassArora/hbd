"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowRight, Heart, Sparkles, Star, Gift } from "lucide-react"
import confetti from "canvas-confetti"

export default function SpecialMessages({ onNext }) {
    const [currentCard, setCurrentCard] = useState(0)

    const messages = [
        {
            title: "My Bestie",
            message: "You're not just my friend, you're my partner in crime! Every adventure with you is pure gold! 🥰",
            icon: Heart,
            color: "from-pink-400 to-purple-500",
            bgColor: "from-pink-100 to-purple-100"
        },
        {
            title: "My Support System",
            message: "You've been there through my ups and downs, always ready to lift me up! You're my rock! 💪",
            icon: Star,
            color: "from-yellow-400 to-orange-500",
            bgColor: "from-yellow-100 to-orange-100"
        },
        {
            title: "My Laughter Partner",
            message: "Your jokes are terrible but your smile is everything! You make every day brighter! 😂",
            icon: Sparkles,
            color: "from-blue-400 to-cyan-500",
            bgColor: "from-blue-100 to-cyan-100"
        },
        {
            title: "My Forever Friend",
            message: "No matter what life throws at us, I know we'll always have each other's backs! 💖",
            icon: Gift,
            color: "from-green-400 to-emerald-500",
            bgColor: "from-green-100 to-emerald-100"
        }
    ]

    const handleNext = () => {
        console.log('handleNext called, currentCard:', currentCard, 'messages.length:', messages.length)
        
        if (currentCard < messages.length - 1) {
            console.log('Moving to next card')
            setCurrentCard(currentCard + 1)
        } else {
            console.log('Moving to next screen')
            onNext()
        }
    }

    const handleCardClick = () => {
        confetti({
            particleCount: 30,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ff69b4", "#ff1493", "#9370db", "#8a2be2", "#ffd700"],
        })
    }

    const currentMessage = messages[currentCard]
    const IconComponent = currentMessage.icon

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Background gradients */}
            <div className="fixed inset-0 z-0 blur-[120px] opacity-20" style={{
                backgroundImage: "radial-gradient(circle at 20% 25%, rgba(255, 99, 165, 0.6), transparent 40%)",
            }} />

            <div className="fixed inset-0 z-0 blur-[120px] opacity-20" style={{
                backgroundImage: "radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.6), transparent 40%)",
            }} />

            <div className="text-center mb-8">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Special Messages
                </motion.h1>
                <motion.p
                    className="text-lg text-purple-300"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Just for you, MERA PYARA BICHUU 💌
                </motion.p>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <motion.div
                    key={currentCard}
                    className="relative cursor-pointer"
                    initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    onClick={handleCardClick}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className={`w-full h-64 bg-gradient-to-br ${currentMessage.bgColor} rounded-2xl shadow-2xl border-2 border-white/20 relative overflow-hidden p-6`}>
                        {/* Card content */}
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
                    </div>
                </motion.div>
            </div>

            {/* Progress indicator */}
            <motion.div
                className="flex justify-center space-x-2 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                {messages.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentCard ? 'bg-purple-500' : 'bg-purple-300'
                        }`}
                        animate={{
                            scale: index === currentCard ? [1, 1.2, 1] : 1
                        }}
                        transition={{ duration: 0.5, repeat: index === currentCard ? Infinity : 0 }}
                    />
                ))}
            </motion.div>

            {/* Next button */}
            <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
            >
                <button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white text-xl px-8 py-4 rounded-full shadow-xl border-2 border-white/70 transition-all duration-300 hover:scale-[103%] active:scale-95"
                    style={{ 
                        minHeight: '60px',
                        minWidth: '200px'
                    }}
                >
                    <div className="flex items-center space-x-2">
                        <span>{currentCard < messages.length - 1 ? 'Next Message' : 'Read Letter'}</span>
                        <ArrowRight className="w-6 h-6" />
                    </div>
                </button>
                
                {/* Debug info */}
                <div className="mt-4 text-white/50 text-center text-sm">
                    Card {currentCard + 1} of {messages.length}
                </div>
            </motion.div>
        </motion.div>
    )
} 