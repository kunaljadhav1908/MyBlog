import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '../../utils/cn'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const authStutas = useSelector((state) => state.auth.stutas)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStutas },
    { name: "Signup", slug: "/signup", active: !authStutas },
    { name: "All Posts", slug: "/all-posts", active: authStutas },
    { name: "Add Post", slug: "/add-post", active: authStutas },
  ]

  const handleNavClick = (slug) => {
    navigate(slug)
    setIsOpen(false)
  }

  return (
    <header className='fixed top-0 left-0 right-0 z-50 glass border-b border-white/10'>
      <Container>
        <nav className='flex items-center justify-between h-20'>
          <div className='flex items-center'>
            <Link to='/' onClick={() => setIsOpen(false)}>
              <Logo width='45px' />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex items-center gap-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.slug)}
                    className={cn(
                      'relative px-5 py-2.5 transition-all duration-300 text-sm font-medium rounded-xl hover:bg-white/5',
                      location.pathname === item.slug ? "text-blue-400" : "text-zinc-400 hover:text-white"
                    )}
                  >
                    {item.name}
                    {location.pathname === item.slug && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-2 left-5 right-5 h-0.5 bg-blue-500 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ) : null
            )}
            {authStutas && (
              <li className="ml-4 pl-4 border-l border-white/10">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden p-2 text-zinc-400 hover:text-white transition-colors'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='md:hidden glass border-t border-white/10 overflow-hidden'
          >
            <Container>
              <ul className='flex flex-col py-6 gap-2'>
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => handleNavClick(item.slug)}
                        className={cn(
                          'w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors',
                          location.pathname === item.slug ? "bg-blue-500/10 text-blue-400" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStutas && (
                  <li className="mt-4 pt-4 border-t border-white/10">
                    <LogoutBtn className="w-full justify-start" />
                  </li>
                )}
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
