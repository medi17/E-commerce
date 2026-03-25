import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

const AppProviders = ({children}) => {
  return (
    <>
      {children}
      <Toaster position="top-right" /> 
    </>
  )
}


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AppProviders>
    <RouterProvider router = {App} />
  </AppProviders>, 
);