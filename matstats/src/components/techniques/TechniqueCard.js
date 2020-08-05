import React from 'react'
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import ApiManager from '../../modules/ApiManager'

const TechniqueCard = props => {

    const handlePriorityChange = (event) => {

        let editRelationship = {}
        if (props.trace === 'home') {
            editRelationship = {            
                "techniqueId": props.relationship.techniqueId,
                "userId": parseInt(sessionStorage.credentials),
                "priority": props.relationship.priority,
                "id": props.relationship.id
            }
        } else {
            editRelationship = {            
                "techniqueId": props.technique.id,
                "userId": parseInt(sessionStorage.credentials),
                "priority": props.priority,
                "id": props.relationship.id
            }
        }

        props.trace === 'home' ? editRelationship.techniqueId = props.relationship.techniqueId : editRelationship.techniqueId = props.technique.id

        
        editRelationship.priority ? editRelationship.priority = false : editRelationship.priority = true
        ApiManager.editObject('techniqueHistory', editRelationship)
            .then(() => {
                
               props.trace === 'home' ? props.getAndSetPriorityTechs() : props.getAndSetAllTechs()
            })
        
    }

    const createRelationship = (event) => {
        const newRelationship = {
            techniqueId: props.technique.id,
            userId: parseInt(sessionStorage.credentials),
            priority: true
        }

        ApiManager.addObject('techniqueHistory', newRelationship)
            .then(() => props.getAndSetAllTechs())
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
                        onChange={ props.relationship.id === undefined ? createRelationship : handlePriorityChange}
                        checked={props.priority}
                    />
                </Card.Body>
            </Card>
        </>
    )

}

export default TechniqueCard