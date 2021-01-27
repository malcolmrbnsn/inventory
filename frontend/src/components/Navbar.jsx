import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
    return (
        <nav>
            <p>Inventory</p>
            <ul>
                <li>
                    <Link to="/login">login</Link>
                </li>
                <li>
                    <Link to="/boxes">Boxes</Link>
                </li>
                <li>
                    <Link to="/sellers">Sellers</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;