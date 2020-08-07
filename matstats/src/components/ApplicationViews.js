import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './home/Home'
import Login from './authentication/Login'
import Registration from './authentication/Registration'
import TechniqueHome from './techniques/TechniqueHome'
import TechniqueForm from './techniques/TechniqueForm'
import TechniqueAll from './techniques/TechniqueAll'
import TechniqueDetail from './techniques/TechniqueDetail'
import SessionHome from './sessions/SessionHome'
import SessionNew from './sessions/SessionNew'
import SessionDetail from './sessions/SessionDetail'
import SessionEdit from './sessions/SessionEdit'
import ApiManager from '../modules/ApiManager'


const ApplicationViews = (props) => {

    const hasUser = props.hasUser
    const setUser = props.setUser

// formats session dates, used multiple times
    const formatDates = (sessionDate) => {
        //creating date format
        const preferredFormat = {weekday: 'long', year: 'numeric', month: 'long', day:'numeric'}
        const dateFormat = new Intl.DateTimeFormat('en-US', preferredFormat)         

         return dateFormat.format(new Date(sessionDate))        

    }
// gets all techinques
    const [techniques, setTechniques] = useState([])
    const getTechs = () => {
        ApiManager.getAll('techniques')
            .then(results => setTechniques(results))
    }
    useEffect(() => {
        getTechs()
    }, [])



    return (
        <>  
            <Router>
                <Route                
                    exact path="/"
                    render={props => {
                        if(hasUser) {
                            return <Home 
                                        formatDates={formatDates}
                                        {...props}                                        
                                    />
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
                            return <TechniqueHome 
                                        {...props}
                                    />
                        } else {
                            return <Redirect to='/login' />
                        }
                        
                    }}
                />
                <Route                
                    exact path="/newtechnique"
                    render={props => {
                        if(hasUser) {
                            return <TechniqueForm 
                                        {...props}
                                    />
                        } else {
                            return <Redirect to='/login' />
                        }
                        
                    }}
                />
                <Route                
                    exact path="/alltechniques"
                    render={props => {
                        if(hasUser) {
                            return <TechniqueAll 
                                        {...props}
                                    />
                        } else {
                            return <Redirect to='/login' />
                        }
                        
                    }}
                />
                <Route                
                    exact path="/techniques/:techniqueId(\d+)"
                    render={props => {
                        if(hasUser) {
                            return <TechniqueDetail 
                                        techniqueId={parseInt(props.match.params.techniqueId)}
                                        {...props}
                                    />
                        } else {
                            return <Redirect to='/login' />
                        }
                        
                    }}
                />
                <Route                
                    exact path="/sessions"
                    render={props => {
                        if(hasUser) {
                            return <SessionHome 
                                        formatDates={formatDates}
                                        {...props}
                                    />
                        } else {
                            return <Redirect to='/login' />
                        }
                        
                    }}
                />
                <Route                
                    exact path="/newsession"
                    render={props => {
                        if(hasUser) {
                            return <SessionNew 
                                        techniques={techniques}
                                        {...props}
                                    />
                        } else {
                            return <Redirect to='/login' />
                        }
                        
                    }}
                />
                <Route                
                    exact path="/sessions/:sessionId(\d+)"
                    render={props => {
                        if(hasUser) {
                            return <SessionDetail 
                                        sessionId={parseInt(props.match.params.sessionId)}
                                        formatDates={formatDates}
                                        techniques={techniques}
                                        {...props}
                                    />
                        } else {
                            return <Redirect to='/login' />
                        }
                        
                    }}
                />
                <Route                
                    exact path="/sessions/:sessionId(\d+)/edit"
                    render={props => {
                        if(hasUser) {
                            return <SessionEdit
                                        techniques={techniques}
                                        {...props}
                                    />
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