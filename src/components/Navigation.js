import React from "react"
import { Link } from "react-router-dom"
import "./Navigation.css"

function Navigation() {
    return (
        <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/teamview">Create a Team</Link>
            <Link to="/profile">Profile</Link>
        </nav>
    )
}

export default Navigation