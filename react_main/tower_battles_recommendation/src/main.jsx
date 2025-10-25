import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx'
import './assets/fontAwesome/fontAwesome';
import Co_login from './pages/login/login.jsx';
import Co_menu from './pages/menu/menu.jsx';
import Co_detail from './pages/detail/detail.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<App />} />
        <Route path="/pages/login" element={<Co_login />} />
        <Route path="/pages/menu" element={<Co_menu />} />
        <Route path="/pages/detail/:towerId" element={<Co_detail />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
