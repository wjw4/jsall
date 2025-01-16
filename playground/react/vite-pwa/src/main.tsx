import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register';

registerSW({
  onRegisteredSW: render,
  onRegisterError: render,
})

function render (...args: any[]) {
  import('./App')
    .then(app => {
      console.log('render app', ...args)
      createRoot(document.getElementById('root')!).render(
        <StrictMode>
          <app.default />
        </StrictMode>,
      )
    })
}

// import './index.css'
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { registerSW } from 'virtual:pwa-register';
// import App from './App'
//
// registerSW()
//
// console.log('render app')
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
