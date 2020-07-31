import React, {useState, useEffect} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ApiManager from '../../modules/ApiManager'
import TechniqueCard from './TechniqueCard'

const TechniqueAll = props => {

    const [allTechs, setAllTechs] = useState([])
    const [priorityTechs, setPriorityTechs] = useState([])
    const [combinedTechs, setCombinedTechs] = useState([])

    const getAndSetAllTechs = () => {
        ApiManager.getAll('techniques')
            .then(results => {
                setAllTechs(results)
                console.log('all', results)
            })
    }

    const getAndSetPriority = () => {
        ApiManager.getPriorityTechniques(sessionStorage.credentials)
        .then(results => {
            setPriorityTechs(results)
            console.log('priority', results)
        })
    }

    const organizeTechs = () => {
        const sortedTechs = []

    }


    useEffect(() => {
        getAndSetAllTechs()
        getAndSetPriority()
        organizeTechs()
    }, [])

    return (
        <>
            <div className="home__body">
                <Jumbotron>
                    <h2>All Techniques</h2>                    
                </Jumbotron>
                {allTechs.map(tech => 
                    <TechniqueCard 
                        key={tech.id}
                        technique={tech}
                    />  
                    
                )}
            </div>
        </>
    )
}

export default TechniqueAll