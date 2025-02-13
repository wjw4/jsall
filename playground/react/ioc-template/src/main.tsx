import './index.css'
import "reflect-metadata";
import { createRoot } from 'react-dom/client'
import App from './app.tsx'

createRoot(document.getElementById('root')!).render(
  <App />
)
