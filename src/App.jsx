import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header, FAB } from './components'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Logo from './components/Logo'

import Skeleton from "./components/Skeleton"; 


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-zinc-950 text-white'>
      <div className='w-full block'>
        <Header />
        <main className="animate-fade-in py-8 pt-24">
          <div className="container mx-auto px-4">
            <Outlet />
          </div>
        </main>
        <Footer />
        <FAB />
      </div>

      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#18181b',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)'
        }
      }} />
    </div>
    
  ) : (
    <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
  <Skeleton />
</div>
  )
  
}

export default App