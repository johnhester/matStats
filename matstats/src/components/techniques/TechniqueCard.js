import React from 'react'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

const TechniqueCard = props => {


    return (
        <>
            <Card 
                className="technique__card"
                bg="secondary"
                text="white"
            >
                <Card.Body className="technique__card--body">
                    <div className="technique__card--items">
                        <strong>{props.technique.name}</strong>
                    </div>
                    <Form.Check
                        className="technique__card--items"
                        aria-label="option 1"
                        id={props.technique.id}
                    />
                </Card.Body>
            </Card>
        </>
    )

}

export default TechniqueCard