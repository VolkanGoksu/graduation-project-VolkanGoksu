import './App.css'
import React from 'react'
import Routes from './Router/Routes'


import GlobalContext from './context/GlobalState'

function App() {
  return (
    <GlobalContext>
        <Routes />
    </GlobalContext>
  )
}

export default App
