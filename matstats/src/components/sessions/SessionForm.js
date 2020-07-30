import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ApiManager from '../../modules/ApiManager'


const SessionForm = props => {

    const [types, setTypes] = useState([])

    const getSessionTypes = () => {
        ApiManager.getAll('sessionTypes')
            .then(result => setTypes(result))
    }

    useEffect(() => {
        getSessionTypes()
    },[])

    return (
        <>
            <Form onSubmit={props.constructNewSession}>
                    <Form.Group className="session__form--date">                        
                        <Form.Label>Date  </Form.Label>
                        <input 
                            type="date"
                            required
                            onChange={props.handleFieldChange}
                            id='date'
                        />                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Session Length</Form.Label>
                        <Form.Control 
                            required
                            onChange={props.handleFieldChange}
                            id='length'
                            placeholder='in hours'
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Session Type</Form.Label>
                        <Form.Control
                            as="select"
                            id="typeId"
                            onChange={props.handleFieldChange}
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
                            placeholder='How did it go?'
                            onChange={props.handleFieldChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="session__form--buttons">
                        <Button
                            type="submit"
                        > 
                            Save 
                        </Button>
                        <Button
                            onClick={() => {props.history.push(`./${props.comeBack}`)}}
                        > 
                            Discard 
                        </Button>
                    </Form.Group>

                </Form>
        </>
    )
}

export default SessionForm