import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './home/Home'
import Login from './authentication/Login'
import Registration from './authentication/Registration'
import TechniqueHome from './techniques/TechniqueHome'
import SessionHome from './sessions/SessionHome'


const ApplicationViews = (props) => {

    const hasUser = props.hasUser
    const setUser = props.setUser

    return (
        <>  
            <Router>
                <Route                
                    exact path="/"
                    render={props => {
                        if(hasUser) {
                            return <Home {...props}/>
                        } else {
                            return <Redirect to='/login' />
                        }
                        
                    }}
                />
                <Route
                    path="/login"
                    render={props => {
                        return <Login setUser={setUser} {...props}/>
                    }}
                />
                <Route
                    path="/register"
                    render={props => {
                        return <Registration setUser={setUser} {...props}/>
                    }}
                />
                <Route                
                    exact path="/techniques"
                    render={props => {
                        if(hasUser) {
                            return <TechniqueHome {...props}/>
                        } else {
                            return <Redirect to='/login' />
                        }
                        
                    }}
                />
                <Route                
                    exact path="/sessions"
                    render={props => {
                        if(hasUser) {
                            return <SessionHome {...props}/>
                        } else {
                            return <Redirect to='/login' />
                        }
                        
                    }}
                />
            </Router>
        </>
    )
}

export default ApplicationViews