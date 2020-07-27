import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './home/Home'
import Login from './authentication/Login'
import Registration from './authentication/Registration'


const ApplicationViews = (props) => {



    return (
        <>  
            <Router>
                <Route                
                    exact path="/"
                    render={props => {
                        console.log("I'm rendering in the home route")
                        return <Home {...props}/>
                    }}
                />
                <Route
                    path="/login"
                    render={props => {
                        return <Login {...props}/>
                    }}
                />
                <Route
                    path="/register"
                    render={props => {
                        return <Registration {...props}/>
                    }}
                />
            </Router>
        </>
    )
}

export default ApplicationViews