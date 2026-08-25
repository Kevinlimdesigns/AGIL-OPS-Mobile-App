import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { rootCss } from './design/tokens.js'

/* Tokens are injected from DESIGN.md's values — components read the CSS vars,
   never raw hex. */
const style = document.createElement('style')
style.textContent = rootCss
document.head.appendChild(style)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
