import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

function Sidebar() {
    const location = useLocation();
    return (
        <div className="sidebar d-flex flex-column text-center text-white p-3 py-5" style={{ height: '100vh', width: '250px' }}>
            <h2 className="my-4">BookaStay</h2>
            <ul className="nav flex-column mt-4">
                <li
                    className={`nav-item mb-3 ${location.pathname === '/dashboard' ? 'active' : ''
                        }`}
                >
                    <Link to="/dashboard" className="nav-link">
                        Dashboard
                    </Link>
                </li>
                <li
                    className={`nav-item mb-3 ${location.pathname === '/manage-users' ? 'active' : ''
                        }`}
                >
                    <Link to="/manage-users" className="nav-link">
                        Manage Users
                    </Link>
                </li>
                <li
                    className={`nav-item mb-3 ${location.pathname === '/manage-hotel-owners' ? 'active' : ''
                        }`}
                >
                    <Link to="/manage-hotel-owners" className="nav-link">
                        Manage Owners
                    </Link>
                </li>
                <li
                    className={`nav-item mb-3 ${location.pathname === '/manage-hotels' ? 'active' : ''
                        }`}
                >
                    <Link to="/manage-hotels" className="nav-link">
                        Manage Hotels
                    </Link>
                </li>
                <li
                    className={`nav-item mb-5 ${location.pathname === '/manage-requests' ? 'active' : ''
                        }`}
                >
                    <Link to="/manage-requests" className="nav-link">
                        Manage Requests
                    </Link>
                </li>
                <li 
                    className={`nav-item last-nav ${location.pathname === '/' ? 'active' : ''
                        }`}
                >
                    <Link to="/login" className="nav-link">
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
