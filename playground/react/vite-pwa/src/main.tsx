import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register';

registerSW({
  onRegisteredSW: render,
  onRegisterError: render,
})

export async function render () {
  console.log('render app')
  const App = await import('./App')
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App.default />
    </StrictMode>,
  )
}