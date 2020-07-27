import React from 'react'
import ApiManager from "../../modules/ApiManager"
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'



const Registration = props => {


    return (
        <>  
            <div className="Form__container">
                <div>
                    <p>
                        Please fill out the form below:
                    </p>
                </div>
                <Form className="registerForm">
                    <Form.Group>
                        <Form.Label htmlFor="registerUsername">Username:</Form.Label>
                        <Form.Control id="registerUsername" placeholder="ex. johnSmith414" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="registerEmail">Email:</Form.Label>                    
                        <Form.Control id="registerEmail" placeholder="email@domain.com"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="registerPassword">Password:</Form.Label>
                        <Form.Control id="registerPassword" type="password" placeholder="password" />
                        <Form.Control id="registerPassword2" type="password" placeholder="re-enter password" />
                    </Form.Group>
                    <Form.Group className="Form__buttonBox">
                        <Button className="Form__button" type="submit">
                            register
                        </Button>
                        <Button 
                            className="Form__button" 
                            type="button"
                            onClick={() => {props.history.push('/login')}}
                        >
                            Go Back
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </>
    )

}

export default Registration