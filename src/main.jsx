import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { HeroesApp } from './HeroesApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroesApp />
  </React.StrictMode>,
)
