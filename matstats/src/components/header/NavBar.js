import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import {Nav, Col} from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle'
import Card from 'react-bootstrap/Card'

const NavBar = (props) => {
//for logout button
    const handleLogout = () => {
        props.clearUser()
    }
//for accordion menu
    const CustomToggle = ({children, eventKey}) => {
        const decoratedOnClick = useAccordionToggle(eventKey);

        return (
            <button
            type="button"
            style={{ backgroundColor: 'EAE0D5' }}
            onClick={decoratedOnClick}
            >
            {children}
            </button>
        );
}

// Bastard creation of accordion, navbar, and card bootstrap css
    return (
        <Navbar variant="dark" fixed="top" className="header">
            <Accordion>
                <Card bg="dark">
                    <CustomToggle eventKey="0"> = </CustomToggle>
                    <Accordion.Collapse eventKey="0">
                        <Col>
                            
                                <Nav.Link href="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link href="/techniques">
                                    Techniques
                                </Nav.Link>
                                <Nav.Link href="/sessions">
                                    Sessions
                                </Nav.Link>
                                <Nav.Link onClick={() => {handleLogout()}}>
                                    Logout
                                </Nav.Link>
                            
                        </Col>                
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <div>
                <h3 className="header__text">matStats</h3>
            </div>
            <div className="header__text">
                {sessionStorage.username}
            </div>
        </Navbar>
    )

}

export default NavBar