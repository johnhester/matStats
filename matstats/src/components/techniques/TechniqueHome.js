import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import ApiManager from '../../modules/ApiManager'
import TechniqueCard from './TechniqueCard'
import TechniqueSearch from './TechniqueSearch'
import Jumbotron from 'react-bootstrap/Jumbotron'

const TechniqueHome = props => {

    const [favorites, setFavorites] = useState([])

    const getAndSetPriorityTechs = () => {
        ApiManager.getPriorityTechniques(sessionStorage.credentials)
            .then(results => {
                let techs = []
                results.map(result => 
                    result.priority === true ? techs.push(result) : null
                )
                setFavorites(techs)
            })
    }



    useEffect(() => {
        getAndSetPriorityTechs()
    }, [])

    return ( 
        <>
            <div className="home__body">
                <Jumbotron>
                    <h3>Your current focus:</h3>
                </Jumbotron>
                    {favorites.map(fav => 
                        <TechniqueCard 
                            key={fav.id}
                            technique={fav.technique}
                            priority={fav.priority}
                            relationship={fav}
                            getAndSetPriorityTechs={getAndSetPriorityTechs}
                            trace='home'
                        />                       
                    )}
                <div>
                    <TechniqueSearch 
                        priorityTechs={favorites}
                        getAndSetPriorityTechs={getAndSetPriorityTechs}
                        {...props}
                    />
                </div>
                <div className="techniqueHome__buttons">
                    <Button
                        type="button"
                        onClick={() => {props.history.push("/alltechniques")}}
                    >
                        View All
                    </Button>
                    <Button
                        type="button"
                        onClick={() => {props.history.push("/newtechnique")}}
                    >
                        Add New Technique
                    </Button>
                </div>
            </div>
        </>
    )
}

export default TechniqueHome