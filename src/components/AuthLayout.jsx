import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStutas = useSelector(state => state.auth.stutas)

    useEffect(() => {
        if (authentication && authStutas !== authentication) {
            navigate("/login")
        } else if (!authentication && authStutas !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStutas, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}
