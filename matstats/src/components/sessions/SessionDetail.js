import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ApiManager from '../../modules/ApiManager'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

const SessionDetail = props => {
    const [session, setSession] = useState({userId:"", notes:"", date:"", length:"", typeId:"", id:""})
    const [type, setType] = useState({type:""})
    const [isLoading, setIsLoading] = useState(true)

    const getSession = () => {
        ApiManager.getExpanded('sessions', props.sessionId, 'sessionType')
            .then(results => {
                setSession(results)
                setType(results.sessionType.type)
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
                            This session was on {session.date.slice(0,10)}
                        </div>
                        <div>
                            It was {session.length} hour(s) long. 
                        </div>
                        <div>
                            Youd spent the session {type.type}.
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