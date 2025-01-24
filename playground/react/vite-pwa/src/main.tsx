import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register';

registerSW({
  onRegisteredSW(swUrl, registration) {
    console.log('Service Worker registered', swUrl);
    waitForSWActivation(registration).then(render)
  },
  onRegisterError(error) {
    console.error('Service Worker registration failed:', error);
    render()
  },
})

/** @desc 等待 sw 激活完成 */
async function waitForSWActivation(registration: ServiceWorkerRegistration | undefined) {
  if (!registration) return

  if (!registration.waiting && !registration.installing) {
    console.log('SW already active!')
    return
  }

  // 檢查 controller 狀態改變：新的 SW 成為 "active" 並控制頁面時觸發
  if (navigator.serviceWorker.controller) {
    return
  }

  return new Promise<void>((resolve) => {
    // SW 狀態改變後觸發，確保等待到激活完成
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('SW activated and controlling the app!')
      resolve()
    });
  });
}


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
