import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Si tienes estilos globales en index.css

// 👇 EL ASESINO DE SERVICE WORKERS EN DESARROLLO 👇
if (import.meta.env.DEV) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
        console.log("🧹 Service Worker eliminado en modo desarrollo.");
      }
    });
  }
}
// 👆 FIN DEL CÓDIGO DE LIMPIEZA 👆

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);