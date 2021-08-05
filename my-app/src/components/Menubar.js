import React, {Component} from 'react';
import {Container, Navbar,Nav} from "react-bootstrap";
import navlogo from '../assets/images/navlogo.svg'
import {Link, NavLink} from "react-router-dom";
class Menubar extends Component {
    render() {
        return (
            <div>
                <Navbar className="sticky-top" bg="light">
                    <Navbar.Brand>
                        <NavLink className='nav-link' to='/'><img className="nav-logo" src={navlogo}/></NavLink>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link><NavLink className='nav-link' to='/registrationcapturephoto'>Registration</NavLink></Nav.Link>
                        <Nav.Link><NavLink className='nav-link' to='/attendencecapturephoto'>Attendence</NavLink></Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Menubar;