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
                    data-idx={props.index}
                    id={props.tech.id}
                    name='totalHit'
                    onChange={props.handleSecondaryFieldChange}
                    
                    {...console.log('idx', props.index)}
                />  
            </Form.Group>
   
        </Card>
        </>
    )
}


export default STSCard