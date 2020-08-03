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
                getType(result.typeId)
                getRelationship(result.id)
            })
    }

    const getRelationship = (techId) => {
        ApiManager.getSinglePriority(techId, sessionStorage.credentials)
            .then(result => {
                    setRelationship(result[0])
            })
    }

    const getType = (id) => {
        ApiManager.getEmbedded('techniqueTypes', id)
            .then(result => setType(result))
    }


    const handlePriorityChange = (event) => {

        const editRelationship = {
            "techniqueId": relationship.techniqueId,
            "userId": parseInt(sessionStorage.credentials),
            "priority": relationship.priority,
            "id": relationship.id
        }

        editRelationship.priority ? editRelationship.priority = false : editRelationship.priority = true
        ApiManager.editObject('techniqueHistory', editRelationship)
            .then(getTechnique())
        
    }

    const handleDelete = (event) => {
        ApiManager.deleteObject('techniqueHistory', event.target.id)
            .then(props.history.push('/techniques'))
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
                        <div className="technique__detail--containerItem">
                            Type: {type.type}
                        </div>
                        <div className="technique__detail--containerItem">
                            Priority?
                            <Form.Check
                                className="technique__detail--checkbox"
                                id={relationship.id}
                                onChange={handlePriorityChange}
                                checked={relationship.priority}
                            />
                        </div>
                    </Card.Body>
                </Card>
                <div className="technique__detail--buttonBox">
                    <Button 
                        id={relationship.id}
                        className="technique__detail--button"
                        type="submit"
                        onClick={handleDelete}
                    >
                        Delete History
                    </Button>
                    <Button 
                        className="technique__detail--button"
                        type="submit"
                        onClick={() => {props.history.push('/techniques')}}
                    >
                        Return
                    </Button>
                </div>
            </div>
        </>
    )
}

export default TechniqueDetail