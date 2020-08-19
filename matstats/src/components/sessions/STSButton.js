import React from 'react'
import Button from 'react-bootstrap/Button'

const STSButton = props => {


    return(
        <>
            <Button 
                className="STS__Button" 
                variant="outline-dark"
                id={props.technique.id}
                value={props.technique.id}
                onClick={props.addTechsUsed}
            >
                {props.technique.name}
            </Button>
        </>
    )
}

export default STSButton