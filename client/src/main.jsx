import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/app.css';
import './styles/index.css';

/**
 * Entry Point of the Application
 *
 * - Uses ReactDOM.createRoot for efficient rendering with React 18
 * - Wraps the application in React.StrictMode for highlighting potential issues
 * - Implements BrowserRouter to enable client-side routing
 * - Loads global styles for consistent UI styling
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
