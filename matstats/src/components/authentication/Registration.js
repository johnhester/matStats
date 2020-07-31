import React, {useState} from 'react'
import ApiManager from "../../modules/ApiManager"
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'



const Registration = props => {

    const [newUser, setNewUser] = useState({ username: "", email: "", password:"" })
    const [isLoading, setIsLoading] = useState(false)


    // sets a pseudostate for the second password
    let password2 = ""
    const setPassword2 = (event) => {
        password2 = event.target.value
        return password2
    }

    const handleFieldChange = (event) => {
        const stateToChange = {...newUser}
        stateToChange[event.target.id] = event.target.value
        setNewUser(stateToChange)
    }

    const getNewUser = (event) => {
        event.preventDefault()

        setIsLoading(true)

        

        ApiManager.getAll("users")
            .then((users) => {

                //flags to prevent duplicate usernames and emails 
                let badUser = false
                let badEmail = false

                // iterate through users to trip flags
                users.find((user) => {
                    if (newUser.username === user.username){
                        alert('That username is unavailabe.')
                        badUser = true
                    } else if (newUser.email === user.email) {
                        alert('That email is already in use.')
                        badEmail = true
                    }
                    return ""
                })
                //compares passwords and creates new user if the flags didn't trip in the .find
                if (newUser.password !== password2) {
                    alert('Your passwords don\'t match. Try again.')
                } else if (badUser === false && badEmail === false) {
                    ApiManager.addObject('users', newUser)
                        .then((results) => {
                            props.setUser(results)
                            props.history.push('/')
                        })
                }
                setIsLoading(false)
            })
    }

    return (
        <>  
            <div className="Form__container" onSubmit={getNewUser}>
                <div>
                    <p>
                        Please fill out the form below:
                    </p>
                </div>
                <Form className="registerForm">
                    <Form.Group>
                        <Form.Label htmlFor="username">Username:</Form.Label>
                        <Form.Control 
                            id="username" 
                            placeholder="ex. gary" 
                            onChange={handleFieldChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="email">Email:</Form.Label>                    
                        <Form.Control 
                            id="email" 
                            placeholder="email@domain.com"
                            onChange={handleFieldChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password">Enter password:</Form.Label>
                        <Form.Control 
                            id="password" 
                            type="password" 
                            placeholder="password" 
                            onChange={handleFieldChange}
                            required
                        />
                        <Form.Control 
                            id="password2" 
                            type="password" 
                            placeholder="re-enter password" 
                            onChange={setPassword2}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="Form__buttonBox">
                        <Button 
                            className="Form__button" 
                            type="submit"
                            disable={isLoading.toString()}
                        >
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