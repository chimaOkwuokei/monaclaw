import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

import PrivyProviders from './PrivyProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivyProviders>
      <App />
    </PrivyProviders>
  </StrictMode>,
)
