import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import ApiManager from '../../modules/ApiManager'
import STSCard from './STSCard'


const SessionTechSearch = props => {
    const [techniques, setTechniques] = useState([])
    const [search, setSearch] = useState('')
    const [filteredTechniques, setFilteredTechniques] = useState([])
    const [select, SetSelect] = useState({})

    const getTechs = () => {
        ApiManager.getAll('techniques')
            .then(results => setTechniques(results))
    }

    useEffect(() => {
        getTechs()
    }, [])

    useEffect(() => {
        setFilteredTechniques(
            techniques.filter(tech =>
                tech.name.toLowerCase().includes(search.toLowerCase())    
            )
        )
    },[search])

    return (
        <>
            <Form.Group>
                <Form.Label>Techniques Used/Trained</Form.Label>
                <Form.Control 
                    type="input"
                    placeholder="Focus on any techniques?"
                    onChange={event => setSearch(event.target.value)}
                />
            </Form.Group>
            <div className="STS__Card--container">
                {filteredTechniques.map(tech => 
                    search === '' ? ''
                    : 
                    <STSCard
                        key={tech.id}
                        technique={tech}
                        {...props}
                    />
                )}
            </div>
        </>
    )
}

export default SessionTechSearch