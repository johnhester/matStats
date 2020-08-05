import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ApiManager from '../../modules/ApiManager'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'


const TechniqueSearch = props => {
    const [techniques, setTechniques] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const getTechs = () => {
        ApiManager.getAll('techniques')
            .then(results => setTechniques(results))
    }

    const filterExistingPriorities = (arr) => {
        
        let filtered = []
        const priorityIds = []
        let resultIds = []
        // techniques are nested in priorityTechs array
        props.priorityTechs.forEach(obj => {
            priorityIds.push(obj.technique.id)
        })
        //creates array of ids for filter
        arr.forEach(obj => {
            resultIds.push(obj.id)
        })
        //the actual filter
        resultIds = resultIds.filter((taco) => {
            return !priorityIds.includes(taco); 
        })
        //creates array of filtered results
        arr.forEach(result => {
            let flag = false

            for (let i = 0; i < resultIds.length; i++) {
                if (resultIds[i] === result.id) {
                    flag = true
                }
            }

            if (flag === true) {
                filtered.push(result)
            }
        })

        return filtered
    }



    const handlePriorityChange = (event) => {
        let check 
        let eventId = event.target.id
        let eventVal 
        let userCred = sessionStorage.credentials
        
        event.target.value === 'on' ? eventVal = true : eventVal = false

        ApiManager.getSinglePriority(eventId, userCred)
            .then( result => {
                console.log('result', result)
                check = result[0]
                console.log('check 1', check)
                return check
            }).then( result => {
    
                if(result !== undefined) {
                    const editRelationship = {
                        "techniqueId": parseInt(eventId),
                        "userId": parseInt(userCred),
                        "priority": eventVal
                    }
                    
                    console.log('eventVal', eventVal)
                    
                        editRelationship.id = check.id
                        console.log('edit relationship', editRelationship)
                        ApiManager.editObject('techniqueHistory', editRelationship)
                        
                } else {
                    const newRelationship = {
                        techniqueId: parseInt(eventId),
                        userId: parseInt(userCred),
                        priority: true
                    }
            
                    ApiManager.addObject('techniqueHistory', newRelationship)
                        
                }
            }).then(props.getAndSetPriorityTechs())



        
    }

 

    useEffect(() => {
        getTechs()
    }, [])

    useEffect(() => {
        setSearchResults(filterExistingPriorities(
            techniques.filter(tech =>
                tech.name.toLowerCase().includes(search.toLowerCase())    
            )
        ))
    },[search])


    return (
        <> 
            <Form.Control
                placeholder="Looking for a technique?"
                onChange={event => event.target.value !== ' ' ? setSearch(event.target.value) : ''}
                
            />
            {searchResults.map(tech => 
                search === '' ? ''
                : <Card 
                 className=".search__card"
                 key={tech.id}
                >
                <Card.Body className="technique__card--body">
                    <Link to={`/techniques/${tech.id}`} >
                        <div className="technique__card--items">
                            <strong>{tech.name}</strong>
                        </div>
                    </Link>

                    <Form.Check
                        className="technique__card--items"
                        id={tech.id}
                        onChange={handlePriorityChange}
                    />
                </Card.Body>
            </Card>
            )}
            
        </>
    )
}

export default TechniqueSearch