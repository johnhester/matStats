import React, {useState, useEffect} from 'react'
import SessionForm from './SessionForm'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ApiManager from '../../modules/ApiManager'


const SessionEdit = props => {
    const [session, setSession] = useState({userId:"", notes:"", date:"", length:"", sessionTypeId:"", id:"", techniqueHit:[]})
    const [isLoading, setIsLoading] = useState(false)
    const [techDetails, setTechDetails] = useState([])


    // makes the initial call for session and techniques
    const initializeEdit = () => {
        ApiManager.getEmbedded('sessions', props.match.params.sessionId,'techniqueHit')
            .then(results => {
                setSession(results)
                ApiManager.getAll('techniques')
                    .then(techResults => {
                        getFullTechDetails(results.techniqueHit, techResults)
                    })
                
            })
    }

    //handles input for the static form 
    const handleFieldChange = event => {
        const stateToChange = { ...session }
        stateToChange[event.target.id] = event.target.value
        setSession(stateToChange)
    }

   
    // handles dynamic input 
    const handleDynamicFieldChange = (event, idx) => {
        const updatedData = [...techDetails]
        updatedData[idx]['usedInSession'] = parseInt(event.target.value)
        //modifies total hit counter on technique


        setTechDetails(updatedData)
    }

    // constructs a new session object for the edit 
    const updateSession = event => {
        event.preventDefault()
        setIsLoading(true)

        const editedSession = {
            id: parseInt(props.match.params.sessionId),
            userId: parseInt(sessionStorage.credentials),
            notes: session.notes,
            date: new Date(session.date),
            length: parseInt(session.length),
            sessionTypeId: parseInt(session.sessionTypeId)
        }

        ApiManager.editObject('sessions', editedSession)
            .then(updatedSession => updateTechniqueHit(updatedSession.id))
            
    }

    const updateTechniqueHit = (sessionId) => {
        techDetails.forEach(tech => {
            if (isNaN(tech.usedInSession)) {
                alert('Please only update technique counts with numbers')
            } else {
                let obj = {
                    techniqueId: parseInt(tech.techniqueId),
                    sessionId: parseInt(sessionId),
                    usedInSession: tech.usedInSession,
                    id: tech.id
                }
                ApiManager.editObject('techniqueHit', obj)
                    .then(() => props.history.push(`/sessions/${props.match.params.sessionId}`))
            }

        })
    }

    //gets techniqueHit objects with an expanded technique session
    const getFullTechDetails = (dataArr, techArr) => {
        let techIds = []
        let hitIds = []
        let sessionTechs = []
        let sessionTechDetails = []
        //skim ids from session array
        dataArr.forEach(obj => {
            techIds.push(obj.techniqueId)
            hitIds.push(obj.id)
        })
        //skims technique list for technique ids used
        techArr.forEach(tech => {
            let flag
            flag = techIds.includes(tech.id)
            if (flag) {
                sessionTechs.push(tech)
            }
        })
        //creates deep object with nested technique attributes
        dataArr.forEach(dataObj => {
            let tacoObj = dataObj
            sessionTechs.forEach(tech => {
                if (dataObj.techniqueId === tech.id) {
                    tacoObj.technique = tech
                }
            })
            sessionTechDetails.push(tacoObj)
        })
        setTechDetails(sessionTechDetails)
        
    }

    useEffect(() => {
        initializeEdit()
    }, [props.match.params.sessionId]) 


    return (
        <>
            <div className="Form__container">
                <Jumbotron>
                    <h3>Edit Session information</h3>
                </Jumbotron>
                { isLoading ? 'Loading Form'
                :
                <SessionForm 
                    handleFieldChange={handleFieldChange}
                    handleDynamicFieldChange={handleDynamicFieldChange}
                    updateSession={updateSession}
                    session={session}
                    techsHit={techDetails}
                    taco='edit'
                    comeBack={`/sessions/${props.match.params.sessionId}`}
                    loading={isLoading}
                    {...props}
                />
                }
                
            </div>
        </>
    )
}

export default SessionEdit