import React, {useState} from 'react'
import ApiManager from '../../modules/ApiManager'
import Form from 'react-bootstrap/Form'


const TechniqueSearch = props => {

    const [searchResults, setSearchResults] = useState([])

    const searchDatabase = (event) => {
        ApiManager.searchTechniques(event)
            .then(results => setSearchResults(results))
    }


    return (
        <> 
            <Form.Control
                placeholder="Looking for a technique?"
                
            />
            <div>

            </div>
        </>
    )
}

export default TechniqueSearch