import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ApiManager from '../../modules/ApiManager'
import {Link} from 'react-router-dom'

const Home = props => {
    // session stuff
    const [mostRecent, setMostRecent] = useState({userId:'', notes: '', date:'', length:'', sessionTypeId:'', id:''})
    const [isLoading, setIsLoading] = useState(true)
    const [date, setDate] = useState()
    //technique stuff
    const [favTechs, setFavTechs] = useState([])

    const getAndSetSession = () => {
        ApiManager.getEmbedded('users', sessionStorage.credentials, 'sessions')
            .then(results => sortSessions(results.sessions))
            .then(sortedResults => {
                setMostRecent(sortedResults[0])
                setDate(props.formatDates(sortedResults[0].date))
            })
    }

    const getPriorities = () => {
        ApiManager.getPriorityTechniques(sessionStorage.credentials)
            .then(results => {
                let techs = []
                results.map(result => 
                    result.priority === true ? techs.push(result.technique) : ''    
                )
                setFavTechs(techs)
            })
    }

    
    const sortSessions = (array) => {
        return array.sort((session1, session2) => new Date(session2.date) - new Date(session1.date))        
    }

    useEffect(() => {
        getAndSetSession()
        getPriorities()
        setIsLoading(false)
    }, [])
   

    return (
        <>
            <div className="home__body">
                <Card className="home__box">
                    <Card.Header>Priority Techniques:</Card.Header>
                    <Card.Body className="home__techniques">
                        {favTechs.map(fav => 
                            <Link key={fav.id} to={`/techniques/${fav.id}`} >
                                <Card  className="home__techniques--card">
                                    {fav.name}
                                </Card>
                            </Link>
                        )}
                    </Card.Body>

                </Card>
                <h5>Your most recent session:</h5>
               { isLoading ? ''
                :<Card className="session__preview--card">
                    <Card.Header className="session__preview--header">
                    <Card className="session__preview--date">
                        {date}
                    </Card>
                    <Link to={`/sessions/${mostRecent.id}`}>
                        <Button>
                            Details
                        </Button>
                    </Link>
                    </Card.Header>
                    <Card.Body>
                    {mostRecent.notes}
                    </Card.Body>
                </Card>}
            </div>
        </>
    )
}

export default Home 