import React, { useState } from 'react'
import ApplicationViews from './ApplicationViews'
import NavBar from './header/NavBar'

const MatStats = () => {

    // authentication checks 
    const isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    const [hasUser, setHasUser] = useState(isAuthenticated())

    const setUser = user => {
        sessionStorage.setItem("credentials", user.id)
        sessionStorage.setItem("username", user.username)
        setHasUser(isAuthenticated())
    }

    const clearUser = () => {
        sessionStorage.clear()
        setHasUser(isAuthenticated())
    }

    return (
        <>
            <NavBar clearUser={clearUser} hasUser={hasUser} />
            <ApplicationViews hasUser={hasUser} setUser={setUser} />
        </>
    )

}


export default MatStats