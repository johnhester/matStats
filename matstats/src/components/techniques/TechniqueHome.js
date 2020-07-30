import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ApiManager from '../../modules/ApiManager'
import TechniqueCard from './TechniqueCard'
import Jumbotron from 'react-bootstrap/Jumbotron'

const TechniqueHome = props => {

    const [favorites, setFavorites] = useState([])

    const getAndSetPriorityTechs = () => {
        ApiManager.getPriorityTechniques(sessionStorage.credentials)
            .then(results => {
                let techs = []
                results.map(result => techs.push(result.technique))
                setFavorites(techs)
                console.log('results', results)
            })
    }


    useEffect(() => {
        getAndSetPriorityTechs()
    }, [])

    return (
        <>
            <div className="home__body">
                <Jumbotron>
                    <h3>Your Techniques</h3>
                </Jumbotron>
                    {favorites.map(fav => 
                        <TechniqueCard 
                            key={fav.id}
                            technique={fav}
                        />                       
                    )}
                <div>
                    <Form.Control
                        placeHolder="Looking for a technique?"
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