import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import toast, { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import {store} from './store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
    <App />
    <Toaster />
    </Provider>
  </StrictMode>,
)
