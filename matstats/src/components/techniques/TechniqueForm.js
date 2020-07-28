import React, {useEffect, useState} from 'react'
import ApiManager from '../../modules/ApiManager'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap'


const TechniqueForm = props => {
    const [types, setTypes] = useState([])
    const [newTech, setNewTech] = useState({name:"", typeId:"", totalHit:0})
    const [priority, setPriority] = useState({priority:""})

    const getTechTypes = () => {
        ApiManager.getAll('techniqueTypes')
            .then(result => setTypes(result))
    }

    const handleFieldChange = (event) => {
        const stateToChange = {...newTech}
        stateToChange[event.target.id] = event.target.value
        setNewTech(stateToChange)
    }

    const getPriority = (event) => {
        const stateToChange = {...priority}
        stateToChange[event.target.id] = event.target.value
        
        if(stateToChange) {
            setPriority(true)
        } else {
            setPriority(false)
        }
    }

    const createNewTech = (event) => {
        event.preventDefault()

        ApiManager.getAll('techniques')
            .then(techs => {

                let badTech = false

                techs.find(tech => {
                    
                    if(newTech.name === tech.name) {
                        badTech = true
                        alert('This technique already exists.')
                    }
                    return ""
                })

                if (badTech === false && priority !== true) {
                    ApiManager.addObject('techniques', newTech)
                        .then(props.history.push('/techniques'))
                } else if (badTech === false && priority === true) {
                    ApiManager.addObject('techniques', newTech)
                        .then(newTechResult => {
                            const techHistObj = {}
                            techHistObj.techniqueId = newTechResult.id
                            techHistObj.userId = parseInt(sessionStorage.credentials)
                            techHistObj.priority = priority
                            ApiManager.addObject('techniqueHistory', techHistObj)
                                .then(props.history.push('/techniques'))
                        })
                } else {
                    alert('we skipped right over logging a technique')
                }

            })

    }

    useEffect(() => {
        getTechTypes()
    }, [])

    return (
        <div className="Form__container">
            <Form onSubmit={createNewTech}>
                <Form.Group>
                    <Form.Label>Technique Name</Form.Label>
                    <Form.Control 
                        id="name"
                        placeholder="ex. Rear-Naked Choke"
                        onChange={handleFieldChange}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Technique Type</Form.Label>
                    <Form.Control
                        as="select"
                        id="typeId"
                        onChange={handleFieldChange}
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
                    <Form.Label>Priority?</Form.Label>
                    <Form.Check                        
                        type='checkbox'
                        id='priority'
                        onChange={getPriority}
                    />
                </Form.Group>
                <Button
                    type="click"
                    onClick={() => {console.log('button', priority)}}
                >
                    Submit New Technique
                </Button>
            </Form>
        </div>
    )

}

export default TechniqueForm