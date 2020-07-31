import React, {useState, useEffect} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import SessionPreview from './SessionPreview'
import ApiManager from '../../modules/ApiManager'

const SessionHome = props => {

    const [sessions, setSessions] = useState([])

    const getSortSetSessions = () => {
        ApiManager.getEmbedded('users', sessionStorage.credentials, 'sessions')
            .then(results => sortSessions(results.sessions))
            .then(results => setSessions(results))
            
    }

    const sortSessions = (array) => {
        return array.sort((session1, session2) => new Date(session2.date) - new Date(session1.date))        
    }


    useEffect(() => {
        getSortSetSessions()
    }, [])

    return (        
        <>
            <div className="home__body">
                <Jumbotron>
                    <h3>Your Training Log</h3>
                </Jumbotron>
                <div className="session__home--new">
                    <Button
                        type='button'
                        onClick={() => {props.history.push('/newSession')}}
                    >
                        New Session
                    </Button>
                </div>
                <div>
                { sessions.map(session => 
                    <SessionPreview 
                        key={session.id}
                        session={session}
                        formatDates={props.formatDates}
                    />
                )}

                </div>
            </div>
        </>
    )
}

export default SessionHome