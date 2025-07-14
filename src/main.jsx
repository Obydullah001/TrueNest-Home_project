import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'

import 'aos/dist/aos.css'
import Aos from 'aos'
import AuthProvider from './Contexts/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className='max-w-7xl mx-auto font-inter'>
    <AuthProvider>
       <RouterProvider router={router} />
       <Toaster position='top-right'></Toaster>
    </AuthProvider>
   </div>
  </StrictMode>,
)
