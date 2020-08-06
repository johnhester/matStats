import React, {useState, useEffect} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ApiManager from '../../modules/ApiManager'
import SessionForm from './SessionForm'

const SessionNew = props => {

    
    const [newSession, setNewSession] = useState({userId:"", notes:"", date:"", length:"", sessionTypeId:""})
    const [techniques, setTechniques] = useState([])
    const [secondaryData, setSecondaryData] = useState([{}])

    const getTechs = () => {
        ApiManager.getAll('techniques')
            .then(results => setTechniques(results))
    }


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
                .then(newSession => techniqueHit(newSession.id))
                .then(() => props.history.push('/sessions'))
        }
               

    }

    const techniqueHit = (newSessionId) => {
        secondaryData.forEach(item => {
            const obj = {
                techniqueId: item.id,
                sessionId: newSessionId,
                usedInSession: item.totalHit
            }

            ApiManager.addObject('techniqueHit', obj)
                .then(resultObj => console.log('result obj', resultObj))

        })
        
    }

    const editTechnique = () => {

    }

    useEffect(() => {
        getTechs()
    }, [])

   
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
                    techniques={techniques}
                    setTechniques={setTechniques}
                    {...props}
                    comeBack='sessions'
                    action='new'
                />
                
            </div>

        </>
    )
}

export default SessionNew