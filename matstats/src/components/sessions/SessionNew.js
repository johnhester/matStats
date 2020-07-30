import React, {useState} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ApiManager from '../../modules/ApiManager'
import SessionForm from './SessionForm'

const SessionNew = props => {

    
    const [newSession, setNewSession] = useState({userId:"", notes:"", date:"", length:"", typeId:""})



    const handleFieldChange = (event) => {
        const stateToChange = {...newSession}
        stateToChange[event.target.id] = event.target.value
        setNewSession(stateToChange)
    }

    const constructNewSession = (event) => {
        event.preventDefault()        
        const sessionObj = newSession

        if (isNaN(newSession.length)) {
            alert('Please enter a number for session length.')
        } else {

            //formats date so that it can be sorted later
            sessionObj.date = new Date(`${sessionObj.date}T00:00:00`)

            sessionObj.userId = parseInt(sessionStorage.credentials, 10)
            sessionObj.length = parseFloat(sessionObj.length, 10)
            ApiManager.addObject('sessions', sessionObj)
                .then(() => props.history.push('/sessions'))
        }
               

    }

   
    return (
        <>  
            <div className="Form__container">
                <Jumbotron>
                    <h3>Log New Session</h3>
                </Jumbotron>
                <SessionForm 
                    handleFieldChange={handleFieldChange}
                    constructNewSession={constructNewSession}
                    {...props}
                    comeBack='sessions'
                />
                
            </div>

        </>
    )
}

export default SessionNew