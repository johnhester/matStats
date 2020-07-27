import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap'

const Login = props => {
    const [credentials, setCredentials] = useState({username:"", password:""})

    const hnadleFieldChange = (event) => {
        const stateToChange = {...credentials}
    }


    return (   
        <>
            <Form className="loginForm">
                <Form.Group htmlFor="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control id="loginUsername" placeholder="Username" />
                </Form.Group>
                <Form.Group htmlFor="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="loginPassword" type="password" placeholder="password" />
                </Form.Group>
                <Form.Group>
                    <Button className="loginForm__button" type="submit">
                        Login
                    </Button>
                    <Button 
                        className="loginForm__button" 
                        type="submit"
                        onClick={() => props.history.push(`/register`)}
                    >
                        Register
                    </Button>
                </Form.Group>
            </Form>
        </> 
    )
}

export default Login