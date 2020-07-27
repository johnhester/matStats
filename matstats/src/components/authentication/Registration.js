import React from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'



const Registration = props => {


    return (
        <>  <div>
                <p>
                    Please fill out the form below:
                </p>
            </div>
            <Form className="registerForm">
                <Form.Group>
                    <Form.Control id="registerUsername" placeholder="Username" />
                </Form.Group>
                <Form.Group>                    
                    <Form.Control id="registerEmail" placeholder="email@domain.com"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control id="registerPassword" type="password" placeholder="password" />
                    <Form.Control id="registerPassword2" type="password" placeholder="re-enter password" />
                </Form.Group>
                <Form.Group>
                    <Button className="registerForm__button" type="submit">
                        register
                    </Button>
                </Form.Group>
            </Form>
        </>
    )

}

export default Registration