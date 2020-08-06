import React, {useState} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ApiManager from '../../modules/ApiManager'
import SessionForm from './SessionForm'

const SessionNew = props => {

    
    const [newSession, setNewSession] = useState({userId:"", notes:"", date:"", length:"", sessionTypeId:""})
    const [secondaryData, setSecondaryData] = useState([{}])


    const handleFieldChange = (event) => {
        const stateToChange = {...newSession}
        stateToChange[event.target.id] = event.target.value
        setNewSession(stateToChange)
    }

    const handleSecondaryFieldChange = (event) => {
        const updatedData = {...secondaryData}
        updatedData[event.target.dataset.idx][event.target.name] = parseInt(event.target.value)
        updatedData[event.target.dataset.idx]['id'] = parseInt(event.target.id)
        setSecondaryData(updatedData)
        console.log('secondaryData', updatedData)
    }

    const constructNewSession = (event) => {
        event.preventDefault()       
        const sessionObj = newSession

        if (isNaN(newSession.length)) {
            alert('Please enter a number for session length.')
        } else {

            //formats date so that it can be sorted later
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
                    handleSecondaryFieldChange={handleSecondaryFieldChange}
                    secondaryData={secondaryData}
                    {...props}
                    comeBack='sessions'
                    action='new'
                />
                
            </div>

        </>
    )
}

export default SessionNew