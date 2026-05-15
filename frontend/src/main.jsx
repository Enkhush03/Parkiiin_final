import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '../../styles/main.css'
import { useState, useEffect } from 'react';

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

function App() {
  const [isDark, setIsDark] = useState(false);

  // Хуудас ачаалах үед localStorage уншина
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Toggle
  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <div>
      <button onClick={toggleTheme}>
        {isDark ? '☀️' : '🌙'}
      </button>
      {/* бусад component-үүд */}
    </div>
  );
}
