import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthcontextProvider } from './contextApi/AuthContext.jsx'
import { ChatsContextProvider } from './contextApi/ChatsContext'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthcontextProvider>

     <ChatsContextProvider>
     <React.StrictMode>
      <App />
    </React.StrictMode>
     </ChatsContextProvider>

  </AuthcontextProvider>
 
)
