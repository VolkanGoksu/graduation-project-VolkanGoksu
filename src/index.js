import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { BrowserRouter as Router } from 'react-router-dom'

export default ReactDOM.render(
  <App />,
  document.getElementById('root') || document.createElement('div')
)

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
