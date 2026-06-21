import React from 'react'
import { createRoot } from 'react-dom/client'
import DMKChecker from './DMKChecker.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DMKChecker />
  </React.StrictMode>
)
