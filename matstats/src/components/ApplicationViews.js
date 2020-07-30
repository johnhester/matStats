import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './home/Home'
import Login from './authentication/Login'
import Registration from './authentication/Registration'
import TechniqueHome from './techniques/TechniqueHome'
import TechniqueForm from './techniques/TechniqueForm'
import TechniqueAll from './techniques/TechniqueAll'
import SessionHome from './sessions/SessionHome'
import SessionNew from './sessions/SessionNew'


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
                    exact path="/newtechnique"
                    render={props => {
                        if(hasUser) {
                            return <TechniqueForm {...props}/>
                        } else {
                            return <Redirect to='/login' />
                        }
                        
                    }}
                />
                <Route                
                    exact path="/alltechniques"
                    render={props => {
                        if(hasUser) {
                            return <TechniqueAll {...props}/>
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
                <Route                
                    exact path="/newsession"
                    render={props => {
                        if(hasUser) {
                            return <SessionNew {...props}/>
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