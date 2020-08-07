import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ApiManager from '../../modules/ApiManager'
import SessionTechSearch from './SessionTechSearch'


const SessionForm = props => {

    const [types, setTypes] = useState([])
     

    const getSessionTypes = () => {
        ApiManager.getAll('sessionTypes')
            .then(result => setTypes(result))
    }

    

    useEffect(() => {
        getSessionTypes()
    }, [])

    return (
        <>
            <Form onSubmit={props.taco === 'edit' ? props.updateSession : props.constructNewSession}>
                    <Form.Group className="session__form--date">                        
                        <Form.Label>Date  </Form.Label>
                        <input 
                            type="date"
                            required
                            onChange={props.handleFieldChange}
                            id='date'
                            value={props.taco === 'edit' ? props.session.date.slice(0,10) : undefined}
                        />                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Session Length</Form.Label>
                        <Form.Control 
                            required
                            onChange={props.handleFieldChange}
                            id='length'
                            placeholder='in hours'
                            value={props.taco === 'edit' ? props.session.length : undefined}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Session Type</Form.Label>
                        <Form.Control
                            as="select"
                            id="sessionTypeId"
                            onChange={props.handleFieldChange}
                            required
                            value={props.taco === 'edit' ? props.session.sessionTypeId : undefined}
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
                    
                    {props.taco === 'edit' ?
                        <>                        
                            <Form.Label>Techniques hit in this session:</Form.Label>
                            {props.techsHit.map((tech, idx) =>
                            <Form.Group key={tech.id}>                                
                                <Form.Label>
                                    {tech.technique.name} 
                                </Form.Label>
                                <Form.Control 
                                    id={`techHitId--${tech.id}`}
                                    name={`techniqueId--${tech.techniqueId}`}
                                    // className={tech.techniqueId}
                                    defaultValue={tech.usedInSession}
                                    onChange={event => props.handleDynamicFieldChange(event, idx)}
                                />
                            </Form.Group>
                            )}
                       </>
                        : <SessionTechSearch 
                            techniques={props.techniques}
                            handleSecondaryFieldChange={props.handleSecondaryFieldChange}
                            secondaryData={props.secondaryData}
                            addDataSlot={props.addDataSlot}
                            taco={props.taco}
                            {...props}
                          />
                    }
                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as='textarea'
                            id='notes'
                            placeholder='How did it go?'
                            onChange={props.handleFieldChange}
                            required
                            value={props.taco === 'edit' ? props.session.notes : undefined}
                        />
                    </Form.Group>
                    <Form.Group className="session__form--buttons">
                        <Button
                            type="submit"
                            disabled={props.loading}
                        > 
                            {props.taco === 'edit' ? 'edit' : 'Save'} 
                        </Button>
                        <Button
                            onClick={() => {props.history.push(props.comeBack)}}
                        > 
                            Discard 
                        </Button>
                    </Form.Group>

                </Form>
        </>
    )
}

export default SessionForm