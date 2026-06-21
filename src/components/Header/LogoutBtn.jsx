import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { LogOut } from 'lucide-react'
import { cn } from '../../utils/cn'

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  return (
    <button
      className={cn(
        'flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300',
        className
      )}
      onClick={logoutHandler}
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  )
}

export default LogoutBtn
