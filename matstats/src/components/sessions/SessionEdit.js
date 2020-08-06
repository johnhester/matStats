import React, {useState, useEffect} from 'react'
import SessionForm from './SessionForm'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ApiManager from '../../modules/ApiManager'


const SessionEdit = props => {
    const [session, setSession] = useState({userId:"", notes:"", date:"", length:"", sessionTypeId:"", id:""})
    const [isLoading, setIsLoading] = useState(false)

    const handleFieldChange = event => {
        const stateToChange = { ...session }
        stateToChange[event.target.id] = event.target.value
        setSession(stateToChange)
    }

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

    useEffect(() => {
        ApiManager.getExpanded('sessions', props.match.params.sessionId)
            .then(results => {
                setSession(results)
                setIsLoading(false)
            })
    }, [props.match.params.sessionId])

    return (
        <>
            <div className="Form__container">
                <Jumbotron>
                    <h3>Edit Session information</h3>
                </Jumbotron>
                <SessionForm 
                    handleFieldChange={handleFieldChange}
                    updateSession={updateSession}
                    session={session}
                    action='edit'
                    comeBack={`/sessions/${props.match.params.sessionId}`}
                    loading={isLoading}
                    {...props}
                />
            </div>
        </>
    )
}

export default SessionEdit