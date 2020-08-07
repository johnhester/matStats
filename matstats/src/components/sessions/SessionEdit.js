import React, {useState, useEffect} from 'react'
import SessionForm from './SessionForm'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ApiManager from '../../modules/ApiManager'


const SessionEdit = props => {
    const [session, setSession] = useState({userId:"", notes:"", date:"", length:"", sessionTypeId:"", id:"", techniqueHit:[]})
    const [isLoading, setIsLoading] = useState(false)
    const [techDetails, setTechDetails] = useState([])
    const blankData = {id:'', totalHit:''}
    const [techData, setTechData] = useState([])

    
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

    //creates objects for the dynamic input
    const addEditSlot = () => {
        setTechData([...techData, {...blankData}])
    }

    // handles dynamic input 
    const handleDynamicFieldChange = (event, idx) => {
        const updatedData = [...techData]
        updatedData[idx]['totalHit'] = event.target.value
        updatedData[idx]['id'] = event.target.id
        setTechData(updatedData)
    }

    // constructs a new session object for the edit 
    const updateSession = event => {
        event.preventDefault()
        setIsLoading(true)

        const editedSession = {
            id: props.match.params.sessionId,
            userId: parseInt(sessionStorage.credentials),
            notes: session.notes,
            date: new Date(session.date),
            length: session.length,
            sessionTypeId: session.sessionTypeId
        }

        ApiManager.editObject('sessions', editedSession)
            .then(() => props.history.push(`/sessions/${props.match.params.sessionId}`))
    }


    //gets techniqueHit objects with an expanded technique session
    const getFullTechDetails = (dataArr, techArr) => {
        let techIds = []
        let hitIds = []
        let sessionTechs = []
        let sessionTechDetails = []
        //skim ids from session array
        dataArr.forEach(obj => {
            addEditSlot()
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
        for(let i=0; i < dataArr.length; i++) {
            addEditSlot()
        }
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