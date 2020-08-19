import React, {useState, useEffect} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ApiManager from '../../modules/ApiManager'
import TechniqueCard from './TechniqueCard'
import Button from 'react-bootstrap/Button'

const TechniqueAll = props => {

    const [allTechs, setAllTechs] = useState([])

    const getAndSetAllTechs = () => {
        ApiManager.getEmbedded('techniques', '', 'techniqueHistory')
        .then(priorityResults => {
            setAllTechs(priorityResults)
        })
    }

    const establishPriority = (tech) => {
        let isTechPriority = false;

        // checks to see if the embedded tech history is truthy
        if(tech.techniqueHistory) {
        // if tech history IS truthy it iterates through the array and sets the priority flag to whatever it is for that user if it exists
            tech.techniqueHistory.find(obj =>        
                obj.userId === parseInt(sessionStorage.credentials) ? isTechPriority = obj.priority :  ''
            )
        }         
        return isTechPriority
    }

    const establishRelationship = (tech) => {
        let relationship = {}
       
            tech.techniqueHistory.find(obj =>
                obj.userId === parseInt(sessionStorage.credentials) ? relationship = obj : ''
            )
        return relationship
    }

    useEffect(() => {
        getAndSetAllTechs()
    }, [])

    return (
        <>
            <div className="home__body">
                <Jumbotron>
                    <h2>All Techniques</h2>                    
                </Jumbotron>
                <div>
                    <Button
                        onClick={() => props.history.push('/techniques')}
                    >
                        Return
                    </Button>
                </div>
                {allTechs.map(tech => 
                    <TechniqueCard 
                        key={tech.id}
                        technique={tech}
                        priority={establishPriority(tech)}
                        relationship={establishRelationship(tech)}
                        getAndSetAllTechs={getAndSetAllTechs}                        
                        trace='all'
                    />  
                    
                )}
            </div>
        </>
    )
}

export default TechniqueAll