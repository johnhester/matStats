import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ApiManager from '../../modules/ApiManager'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

const SessionDetail = props => {
    const [session, setSession] = useState({userId:"", notes:"", date:"", length:"", sessionTypeId:"", id:"", techniqueHit: []})
    const [date, setDate] = useState()
    const [type, setType] = useState()
    const [techData, setTechData] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    

    const getSession = () => {
        ApiManager.getAllSessionData(props.sessionId)
            .then(result => {
                Promise.all([setSession(result),                
                    setType(result.sessionType.type),
                    setDate(props.formatDates(result.date)),
                    setTechData(getTH(result.techniqueHit))
                ])
                
            })
    }

    const getTH = (techDataArr) => {
        let techArr = []
        techDataArr.forEach(dataObj => {
            ApiManager.getExpanded('techniqueHit', dataObj.id, 'technique')
                .then(result => {
                    techArr.push(result)               
                })
             
        })
        return techArr  
    }
    

    const handleDelete = () => {
        ApiManager.deleteObject('sessions', props.sessionId)
            .then(props.history.push('/sessions'))
            .then(() => {
                techData.forEach(dataObj => 
                    removeTechniquesHit(dataObj)
                )
            }).then(() => {
                techData.forEach(obj => 
                    ApiManager.deleteObject('techniqueHit', obj.id)
                )
            })
    }

    const removeTechniquesHit = (dataObj) => {
        ApiManager.getEmbedded('techniques', dataObj.id)
            .then(techObj => {
                console.log('before subtraction', techObj.totalHit)
                techObj.totalHit -= dataObj.usedInSession
                console.log('after subtraction', techObj.totalHit)
                ApiManager.editObject('techniques', techObj)
            })
        
    }

    useEffect(() => {
        getSession()
        setIsLoading(false)
    }, [props.sessionId])

    return(
        <> { isLoading ? <p>Page will load shortly</p>
                :
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
                            <Card.Header>Techniques Hit in Session:</Card.Header>
                            <Card.Body>
                                { isLoading ? '' :
                                techData.map(tech =>
                                    <div key={tech.techniqueId}>
                                    <div>{tech.technique.name}</div>
                                    <div>{tech.usedInSession}</div>
                                    </div>
                                )}
                            </Card.Body>
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
            }
            
        </>
    )
}

export default SessionDetail