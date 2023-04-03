import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {createRoot} from 'react-dom/client'
import App from './App'

// Create a root.
const root = createRoot(document.getElementById('root'));

// Initial render: Render an element to the root.
root.render(<App />);
