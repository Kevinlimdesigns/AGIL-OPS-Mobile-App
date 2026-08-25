import React, { useEffect, useState } from 'react'
import ChatThread from './chat/ChatThread.jsx'
import './styles.css'

export default function App() {
  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="stage">
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      >
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
      <ChatThread />
    </div>
  )
}
