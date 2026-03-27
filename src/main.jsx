import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { queryClient } from './lib/queryClient.js'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const AppProviders = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AppProviders>
    <RouterProvider router = {App} />
  </AppProviders>, 
);