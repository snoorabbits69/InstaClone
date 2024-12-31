import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './Redux/Store.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import Socketcontextprovider from './context/Socketcontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 
    <Provider store={store}>
    <Socketcontextprovider>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
  </Socketcontextprovider>
    </Provider>
   
  </React.StrictMode>,
)

