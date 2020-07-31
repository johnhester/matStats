import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ApiManager from '../../modules/ApiManager'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const TechniqueDetail = props => {
    const [technique, setTechnique] = useState({name: "", typeId: "", totalHit:"",id:""})
    const [type, setType] = useState({id: "", type:""})
    const [relationship, setRelationship] = useState({userId:"", techniqeId:"", priority:"", id:""})

    const getTechnique = () => {
        ApiManager.getEmbedded('techniques', props.techniqueId)
            .then(result => {
                setTechnique(result)
                console.log('technique', result)
                getType(result.typeId)
                getRelationship(result.id)
            })
    }

    const getRelationship = (techId) => {
        ApiManager.getSinglePriority(techId, sessionStorage.credentials)
            .then(result => setRelationship(result))
    }

    const getType = (id) => {
        ApiManager.getEmbedded('techniqueTypes', id)
            .then(result => setType(result))
    }

    useEffect(() => {
        getTechnique()
    }, [])

    return(
        <>
            <div className="technique__detail--container">
                <Card>
                    <Jumbotron>
                        <h3>{technique.name}</h3>
                    </Jumbotron>
                    <Card.Body>
                        <div>
                            Type: {type.type}
                        </div>
                        <div>
                            Priority?
                            <Form.Check
                                id={relationship.id}
                                checked={relationship.priority}
                            />
                        </div>
                    </Card.Body>
                </Card>
                <div>

                </div>
            </div>
        </>
    )
}

export default TechniqueDetail