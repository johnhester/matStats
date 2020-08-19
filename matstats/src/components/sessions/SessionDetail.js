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
                    setSession(result)                
                    setType(result.sessionType.type)
                    setDate(props.formatDates(result.date))
                    ApiManager.getAll('techniques')
                        .then(techResults => {
                            getFullTechDetails(result.techniqueHit, techResults)
                        })
                    
                
                
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
        setTechData(sessionTechDetails)
        
    }

    const handleDelete = () => {
        ApiManager.deleteObject('sessions', props.sessionId)
            .then(props.history.push('/sessions'))
            .then(() => {
                techData.forEach(dataObj => 
                    removeTechniquesHit(dataObj)
                )
            }).then(() => {
                techData.forEach(obj => {
                    console.log('obj', obj)
                    ApiManager.deleteObject('techniqueHit', obj.id)
                })
            }) 
    }

    const removeTechniquesHit = (dataObj) => {
        ApiManager.getEmbedded('techniques', dataObj.technique.id,'')
            .then(techObj => {
                techObj.totalHit -= dataObj.usedInSession
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
                        <Card className="session__detail--technique">
                            <Card.Header>Techniques Hit in Session:</Card.Header>
                            <Card.Body>
                                { isLoading ? '' :
                                techData.map(tech =>
                                    <div key={tech.id}>
                                        <div>{tech.technique.name}: {tech.usedInSession}</div>
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