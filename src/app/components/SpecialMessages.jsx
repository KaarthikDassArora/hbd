"use client"

import { useState } from "react"
import { Heart, Sparkles, Star, Gift } from "lucide-react"

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

    const currentMessage = messages[currentCard]
    const IconComponent = currentMessage.icon

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-950/30 via-black to-purple-950/30">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4">
                    Special Messages
                </h1>
                <p className="text-lg text-purple-300">
                    Just for you, MERA PYARA BICHUU 💌
                </p>
            </div>

            <div className="w-full max-w-md mb-8">
                <div className={`w-full h-64 bg-gradient-to-br ${currentMessage.bgColor} rounded-2xl shadow-2xl border-2 border-white/20 p-6`}>
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <IconComponent className={`w-16 h-16 text-transparent bg-clip-text bg-gradient-to-r ${currentMessage.color} mb-4`} />
                        <h2 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentMessage.color} mb-4`}>
                            {currentMessage.title}
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {currentMessage.message}
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center space-x-2 mb-8">
                {messages.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentCard ? 'bg-purple-500' : 'bg-purple-300'
                        }`}
                    />
                ))}
            </div>

            {/* Simple buttons */}
            <div className="space-y-4">
                {/* Button 1 */}
                <button
                    onClick={() => {
                        alert('Button 1 clicked!')
                        if (currentCard < messages.length - 1) {
                            setCurrentCard(currentCard + 1)
                        } else {
                            onNext()
                        }
                    }}
                    className="bg-red-500 text-white px-8 py-4 rounded-lg text-xl font-bold"
                    style={{ minWidth: '200px', minHeight: '60px' }}
                >
                    🔴 Button 1 - Next
                </button>

                {/* Button 2 */}
                <button
                    onClick={() => {
                        alert('Button 2 clicked!')
                        if (currentCard < messages.length - 1) {
                            setCurrentCard(currentCard + 1)
                        } else {
                            onNext()
                        }
                    }}
                    className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-bold"
                    style={{ minWidth: '200px', minHeight: '60px' }}
                >
                    🔵 Button 2 - Next
                </button>

                {/* Button 3 */}
                <button
                    onClick={() => {
                        alert('Button 3 clicked!')
                        onNext()
                    }}
                    className="bg-green-500 text-white px-8 py-4 rounded-lg text-xl font-bold"
                    style={{ minWidth: '200px', minHeight: '60px' }}
                >
                    🟢 Button 3 - Skip to Letter
                </button>

                {/* Debug info */}
                <div className="text-white/70 text-center text-sm">
                    Card {currentCard + 1} of {messages.length}
                </div>
            </div>
        </div>
    )
} 