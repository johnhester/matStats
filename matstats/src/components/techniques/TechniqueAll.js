import React, {useState, useEffect} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ApiManager from '../../modules/ApiManager'
import TechniqueCard from './TechniqueCard'

const TechniqueAll = props => {

    const [techniques, setTechniques] = useState([])

    const getAndSetAllTechs= () => {
        ApiManager.getAll('techniques')
            .then(results => setTechniques(results))
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
                {/* {techniques.map(tech => 
                    <TechniqueCard 
                        key={tech.id}
                        technique={tech}
                    />  
                    
                )} */}
            </div>
        </>
    )
}

export default TechniqueAll