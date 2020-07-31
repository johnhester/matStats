import React from 'react'
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import ApiManager from '../../modules/ApiManager'

const TechniqueCard = props => {

    const handlePriorityChange = (event) => {
        console.log('checkbox', event.target.value)
        console.log('id', event.target.id)
        console.log('prop check', props.relationship)

        const editRelationship = {
            "techniqueId": props.relationship.techniqueId,
            "userId": parseInt(sessionStorage.credentials),
            "priority": props.relationship.priority,
            "id": props.relationship.id
        }

        editRelationship.priority ? editRelationship.priority = false : editRelationship.priority = true
        ApiManager.editObject('techniqueHistory', editRelationship)
            .then(result => console.log('after edit',result))
            .then(props.getAndSetPriorityTechs())
        
    }


    return (
        <>
            <Card 
                className="technique__card"
            >
                <Card.Body className="technique__card--body">
                    <Link to={`/techniques/${props.technique.id}`} >
                        <div className="technique__card--items">
                            <strong>{props.technique.name}</strong>
                        </div>
                    </Link>

                    <Form.Check
                        className="technique__card--items"
                        id={props.technique.id}
                        onChange={handlePriorityChange}
                        checked={props.priority}
                    />
                </Card.Body>
            </Card>
        </>
    )

}

export default TechniqueCard