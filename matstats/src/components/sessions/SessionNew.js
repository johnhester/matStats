import React, {useState, useEffect} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ApiManager from '../../modules/ApiManager'

const SessionNew = props => {

    const [types, setTypes] = useState([])
    const [newSession, setNewSession] = useState({userId:"", notes:"", date:"", length:"", type:""})

    const getSessionTypes = () => {
        ApiManager.getAll('sessionTypes')
            .then(result => setTypes(result))
    }

    const handleFieldChange = (event) => {
        const stateToChange = {...newSession}
        stateToChange[event.target.id] = event.target.value
        setNewSession(stateToChange)
    }

    const constructNewSession = (event) => {
        event.preventDefault()
    }

    // initial pull for session types 
    useEffect(() => {
        getSessionTypes()
    }, [])

    return (
        <>  
            <div className="Form__container">
                <Jumbotron>
                    <h3>Log New Session</h3>
                </Jumbotron>
                <Form >
                    <Form.Group className="session__form--date">                        
                        <Form.Label>Date:  </Form.Label>
                        <input 
                            type="date"
                            required
                            onChange={handleFieldChange}
                            id='date'
                        />                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Session Length</Form.Label>
                        <Form.Control 
                            required
                            onChange={handleFieldChange}
                            id='length'
                            placeholder='in hours'
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Session Type</Form.Label>
                        <Form.Control
                            as="select"
                            id="typeId"
                            onChange={handleFieldChange}
                            required
                        >
                            <option value="0">pick one</option>
                            {types.map(type => 
                                <option 
                                    key={type.id} 
                                    value={type.id}
                                >
                                    {type.type}
                                </option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Techniques Used/Trained</Form.Label>
                        <Form.Control 
                            type="input"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as='textarea'
                            id='notes'
                            required
                        />
                    </Form.Group>
                    <Form.Group className="session__form--buttons">
                        <Button> 
                            Save 
                        </Button>
                        <Button
                            onClick={() => {props.history.push('/sessions')}}
                        > 
                            Discard 
                        </Button>
                    </Form.Group>

                </Form>
            </div>

        </>
    )
}

export default SessionNew