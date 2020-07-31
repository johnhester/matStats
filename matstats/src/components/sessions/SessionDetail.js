import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ApiManager from '../../modules/ApiManager'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

const SessionDetail = props => {
    const [session, setSession] = useState({userId:"", notes:"", date:"", length:"", sessionTypeId:"", id:""})
    const [date, setDate] = useState()
    const [type, setType] = useState()
    const [isLoading, setIsLoading] = useState(true)



    const getSession = () => {
        ApiManager.getExpanded('sessions', props.sessionId, 'sessionType')
            .then(result => {
                setSession(result)
                setType(result.sessionType.type)
                setDate(props.formatDates(result.date))
            })
    }
    

    const handleDelete = () => {
        ApiManager.deleteObject('sessions', props.sessionId)
            .then(props.history.push('/sessions'))
    }

    useEffect(() => {
        getSession()
        setIsLoading(false)
    }, [props.sessionId])

    return(
        <>
            <div className="Form__container">
                <Card>
                    <Card.Header>
                        Here are your session details:
                    </Card.Header>
                    <Card.Body>

                        <div>
                            This session was on {date}                        
                        </div>
                        <div>
                            It was {session.length} hour(s) long. 
                        </div>
                        <div>
                            You spent the session {type}.
                        </div>
                        <Card body className="session__detail--technique">
                            Technique placeholder
                        </Card>
                        <div>
                            {session.notes}
                        </div>
                    </Card.Body>
                </Card>
                <div className="session__detail--buttons">
                        <Link to='/sessions'>
                            <Button>
                                Return
                            </Button>
                        </Link>
                        <Link to={`/sessions/${props.sessionId}/edit`}>
                            <Button>
                                Edit
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
            </div>
        </>
    )
}

export default SessionDetail