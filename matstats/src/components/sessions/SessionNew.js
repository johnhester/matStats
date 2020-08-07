import React, {useState, useEffect} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ApiManager from '../../modules/ApiManager'
import SessionForm from './SessionForm'

const SessionNew = props => {

    // collects data from static session form
    const [newSession, setNewSession] = useState({userId:"", notes:"", date:"", length:"", sessionTypeId:""})
    // collects data from dynamic form
    const blankData = {id:"", totalHit:""}
    const [secondaryData, setSecondaryData] = useState([])

  

    const addDataSlot = () => {
        setSecondaryData([...secondaryData, {...blankData}])
    }

    const handleFieldChange = (event) => {
        const stateToChange = {...newSession}
        stateToChange[event.target.id] = event.target.value
        setNewSession(stateToChange)
    }

    const handleSecondaryFieldChange = (event, idx) => {
        const updatedData = [...secondaryData]
        updatedData[idx]['id'] = parseInt(event.target.id)
        updatedData[idx][event.target.name] = parseInt(event.target.value)
        setSecondaryData(updatedData)
    }

    const constructNewSession = (event) => {
        event.preventDefault()       
        const sessionObj = newSession

        if (isNaN(newSession.length)) {
            alert('Please enter a number for session length.')
        } else {
            sessionObj.userId = parseInt(sessionStorage.credentials, 10)
            sessionObj.length = parseFloat(sessionObj.length, 10)
            ApiManager.addObject('sessions', sessionObj)
                .then(newSession => techniqueHit(newSession.id))
                .then(() => getTechsToEdit())
                .then(() => props.history.push('/sessions'))
        }
               

    }

    const techniqueHit = (newSessionId) => {
        
        secondaryData.forEach(item => {
            if (isNaN(item.totalHit)) {
                alert('Please enter a number for successfult technique use.')
            } else {                
                const obj = {
                    techniqueId: item.id,
                    sessionId: newSessionId,
                    usedInSession: item.totalHit
                }                
                ApiManager.addObject('techniqueHit', obj) 
            }
        })
    }

    const getTechsToEdit = () => {
        const arr = []
        secondaryData.forEach(item => arr.push(item.id))
        
        props.techniques.forEach(tech => {
            let flag
            flag = arr.includes(tech.id)
            if(flag) {editTechCounter(tech)}
        })
    }

    const editTechCounter = (obj) => {
  
        secondaryData.forEach(item => 
            item.id === obj.id ? obj.totalHit += item.totalHit : ''
        )
        ApiManager.editObject('techniques', obj)
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
                    addDataSlot={addDataSlot}
                    {...props}
                    comeBack='sessions'
                    taco='new'
                />
                
            </div>

        </>
    )
}

export default SessionNew