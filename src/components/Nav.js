import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import './Nav.css'

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <NavLink activeClassName="active" exact className="link"to="/">Home</NavLink>
                <NavLink activeClassName="active" exact className="link"to="/stats" >Stats</NavLink>
                
            </nav>
        )
    }
}
