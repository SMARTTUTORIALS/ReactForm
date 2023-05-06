import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [registrationLinkActive, setRegistrationLinkState] = useState(true);
    const [userDataLinkActive, setUserDataLinkState] = useState(false);

    const markActive = (identifier) => {
        switch (identifier) {
            case 1:
                setRegistrationLinkState(true);
                setUserDataLinkState(false);
                break;
            case 2:
                setRegistrationLinkState(false);
                setUserDataLinkState(true);
                break;
            default:
                setRegistrationLinkState(true);
                setUserDataLinkState(false);
                break;
        }
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/">Onito Technologies</Link>
                    <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Onito Technologies</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link onClick={() => markActive(1)} className={`nav-link ${registrationLinkActive && 'active'}`} to="/">
                                        <span data-bs-dismiss="offcanvas" aria-label="Close">Registration Page</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link onClick={() => markActive(2)} className={`nav-link ${userDataLinkActive && 'active'}`} to="/users">
                                        <span data-bs-dismiss="offcanvas" aria-label="Close">Registered Users Data</span>
                                    </Link>
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar