import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import ApiManager from '../../modules/ApiManager'
import STSButton from './STSButton'
import STSCard from './STSCard'


const SessionTechSearch = props => {
    //search related states 
    
    const [search, setSearch] = useState('')
    const [filteredTechniques, setFilteredTechniques] = useState([])
    //dynamic form related states
    const [techsClicked, setTechsClicked] = useState([])
    const [usedTechs, setUsedTechs] = useState([])



    const addTechsUsed = (event) => {
        let flag
        flag = techsClicked.includes(parseInt(event.target.value))
        if (!flag) {
            props.addDataSlot()
            setTechsClicked([...techsClicked, parseInt(event.target.value)])
        } 
    }
    
    const filterClicked = () => {
        //iterates through techniques to see if any of them were clicked
        props.techniques.forEach(tech => {
            let flag             
            flag = techsClicked.includes(tech.id)
            if(flag) {setUsedTechs([...usedTechs, tech])} 

        })
    }
   

    useEffect(() => {
        setFilteredTechniques(
            props.techniques.filter(tech =>
                tech.name.toLowerCase().includes(search.toLowerCase())    
            )
        )        
    },[search])

    useEffect(() => {
        filterClicked()
    }, [techsClicked])

    return (
        <>
            <Form.Group>
                <Form.Label>Techniques Used/Trained</Form.Label>
                <Form.Control 
                    type="input"
                    placeholder={ props.taco === 'edit' ? "Any techniques you forgot?" : "Focus on any techniques?"}
                    onChange={event => setSearch(event.target.value)}
                />
            </Form.Group>
            <div className="STS__Button--container">
                {filteredTechniques.map(tech => 
                    search === '' ? ''
                    : 
                    <STSButton
                        key={tech.id}
                        technique={tech}
                        addTechsUsed={addTechsUsed}
                        {...props}
                    />
                )}
            </div>
            <div className="STS__Card--container">
            {usedTechs.map((tech, idx) => 
                <STSCard 
                    key={tech.id}
                    tech={tech}
                    idx={idx}
                    handleSecondaryFieldChange={props.handleSecondaryFieldChange}
                    secondaryData={props.secondaryData}
                    {...props}
                />                
            )}
            </div>

        </>
    )
}

export default SessionTechSearch