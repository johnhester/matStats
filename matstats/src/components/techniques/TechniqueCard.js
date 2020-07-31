import React from 'react'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

const TechniqueCard = props => {


    return (
        <>
            <Card 
                className="technique__card"
            >
                <Card.Body className="technique__card--body">
                    <div className="technique__card--items">
                        <strong>{props.technique.technique.name}</strong>
                    </div>
                    <Form.Check
                        className="technique__card--items"
                        id={props.technique.id}
                        onChange={props.handleChange}
                        checked={props.technique.priority}
                    />
                </Card.Body>
            </Card>
        </>
    )

}

export default TechniqueCard