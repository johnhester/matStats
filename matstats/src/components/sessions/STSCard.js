import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const STSCard = props => {


    return(
        <>
            <Button 
                className="STS__Card" 
                variant="outline-dark"
                id={props.technique.id}
                value={props.technique}
            >
                {props.technique.name}
            </Button>
        </>
    )
}

export default STSCard