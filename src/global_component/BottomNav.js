import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const BottomNav = (props) => {
    const location = useLocation()

    const handleBeforeUnload = (e) => {
        e.preventDefault();
        const message =
            "Are you sure you want to leave? All provided data will be lost.";
        e.returnValue = message;
        return message;
    };

    return (
        <div className='md:hidden bg-brown flex justify-center fixed bottom-0 left-0 right-0 w-full'>
            <NavLink className={`nav-item ${(location.pathname === '/') && 'bg-teal'}`} to="/"
                onClick={() => {
                    if (window.location.pathname.slice(0, 4) === '/add')
                        handleBeforeUnload()
                }}
            >
                Home
            </NavLink>
            <NavLink className={`nav-item ${(location.pathname === '/blogs') && 'bg-teal'}`} to="blogs"
                onClick={() => {
                    if (window.location.pathname.slice(0, 4) === '/add')
                        handleBeforeUnload()
                }}
            >
                Blogs
            </NavLink>
            <NavLink className={`nav-item
            ${props.user ? 'block' : 'hidden'}
            ${(location.pathname.slice(0, 4) === '/add') && 'bg-teal'}`
            }
                to="add/init"
                onClick={() => {
                    if (location.pathname.slice(5) !== 'init')
                        handleBeforeUnload()
                }}
            >
                Create
            </NavLink>
        </div>
    )
}

export default BottomNav
