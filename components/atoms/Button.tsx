'use client'

import { motion } from 'framer-motion'

interface FancyButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string//njdjjfd
}

export default function FancyButton({
  children,
  onClick,
  type = 'button',
  className = '',
}: FancyButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      type={type}
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center px-6 py-3 rounded-2xl font-semibold
        text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-indigo-500/20
        hover:from-indigo-500 hover:to-purple-500 hover:shadow-purple-500/30
        focus:outline-none focus:ring-2 focus:ring-purple-400
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      {children}
      <span className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
    </motion.button>
  )
}