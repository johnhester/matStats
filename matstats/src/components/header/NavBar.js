import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import {Nav} from 'react-bootstrap'
import NavDropDown from 'react-bootstrap/Dropdown'

const NavBar = (props) => {
//for logout button
    const handleLogout = () => {
        props.clearUser()
    }


// Bastard creation of accordion, navbar, and card bootstrap css
    return (
        <Navbar collapseOnSelect expand='lg' bg='black' variant="dark" fixed="top" className="header">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Brand className="header__text">matStats</Navbar.Brand>            
            <div className="header__text">
                {sessionStorage.username}
            </div>
            <Navbar.Collapse id="responsive-navbar-nav">
            { props.hasUser ?
            <>  
                
                <Nav className="mr-auto">                    
                    <NavDropDown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropDown.Item className="header__text" href='/'>Home</NavDropDown.Item>
                        <NavDropDown.Item className="header__text" href='/techniques'>Techniques</NavDropDown.Item>
                        <NavDropDown.Item className="header__text" href='/sessions'>Sessions</NavDropDown.Item>
                        <NavDropDown.Divider/>
                        <NavDropDown.Item className="header__text" onClick={() => {handleLogout()}}>Logout</NavDropDown.Item>
                    </NavDropDown>
                    
                </Nav>
                
            </>            
            
            : null
            }
            </Navbar.Collapse>            
            
        </Navbar>
    )

}

export default NavBar