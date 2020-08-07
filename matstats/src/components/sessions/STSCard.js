import React from 'react'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'


const STSCard = props => {


    return(
        <>                
        <Card className="STS__Card">                         
            <p>{props.tech.name}</p>
            <Form.Group className="STS__Card--inputBox">
                <Form.Label>Successful uses: </Form.Label>
                <Form.Control
                    className="STS__Card--input"
                    data-idx={props.idx}
                    id={props.tech.id}
                    name='totalHit'
                    onChange={event => props.handleSecondaryFieldChange(event, props.idx)}
                    
                />  
            </Form.Group>
   
        </Card>
        </>
    )
}


export default STSCard