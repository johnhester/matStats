import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap'
import ApiManager from '../../modules/ApiManager'

const Login = props => {
    const [credentials, setCredentials] = useState({username:"", password:""})

    //updates credentials with each keypress
    const handleFieldChange = (event) => {
        const stateToChange = {...credentials}
        stateToChange[event.target.id] = event.target.value
        setCredentials(stateToChange)
        console.log('credentials', credentials)
    }

    const handleLogin = (submitted) => {
        submitted.preventDefault()

        //calls all users and compares login data
        ApiManager.getAll('users')
            .then((users) => {
                users.find(user => {
                    console.log(user)
                    // checks user credentials against those entered on the form
                    if (user.username === credentials.username && user.password !== credentials.password) {
                        alert('Incorrect password. Please re-enter.')
                    } else if (user.username === credentials.username && user.password === credentials.password) {
                        props.setUser(user)
                        props.history.push("/")
                    }
                    return ''
                })
            })

    }

    return (   
        <>
            
            <Form className="Form__container" onSubmit={handleLogin}>
                <Form.Group htmlFor="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        id="username" 
                        required
                        placeholder="i.e. stranglinator14" 
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group htmlFor="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        id="password" 
                        type="password" 
                        required
                        placeholder="Tell no one" 
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group className="Form__buttonBox">
                    <Button 
                        className="Form__button" 
                        type="submit"
                    >
                        Login
                    </Button>
                    <Button 
                        className="Form__button" 
                        type="button"
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