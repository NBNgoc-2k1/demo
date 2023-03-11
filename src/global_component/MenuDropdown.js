import { faArrowRightFromBracket, faBlog, faBookmark, faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from '@mui/material'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogoutAPI } from '../api/AuthAPI'

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const MenuDropdown = (props) => {
    const location = useLocation()
    const navigation = useNavigate();
    const handleBeforeUnload = (e) => {
        e.preventDefault();
        const message =
            "Are you sure you want to leave? All provided data will be lost.";
        e.returnValue = message;
        return message;
    };

    return (
        <div className={`${props.open ? 'flex' : 'hidden'} w-full h-screen absolute left-0`}
            onClick={(e) => {
                if (e.currentTarget === e.target) {
                    props.onClose();
                }
            }}
        >
            <div className={` rounded-lg w-72
                absolute bg-teal top-20 border-2 border-solid border-white
                right-[3vw] sm:right-[13vw] md:right-[3vw] lg:right-6 max-[414px]:right-[6vw]
            `}>
                <span className="absolute right-3 -top-3"
                    style={{
                        borderLeft: '12px solid transparent',
                        borderRight: "12px solid transparent",
                        borderBottom: '11px solid #ffffff'
                    }}
                >
                    <span className="absolute top-px -right-[0.8rem]"
                        style={{
                            borderLeft: "13px solid transparent",
                            borderRight: "13px solid transparent",
                            borderBottom: "12px solid #649393",
                        }}
                    ></span>
                </span>
                {props.user && <div className="flex pl-2 py-2 border-b-white border-b-2 w-full">
                    <Avatar {...stringAvatar(`${props.user.username}`)} className='my-4' />
                    <div className="flex flex-col text-base my-3 pl-2">
                        <p className="text-white "
                        >{props.user.username}</p>
                        <p className="text-white"
                        >{props.user.userEmail}</p>
                    </div>
                </div>}
                <div className="flex max-w-full flex-col ml-4"
                >
                    <div className="flex mt-4"
                    >
                        <FontAwesomeIcon icon={faUser} size="xl" color="white" />
                        <Link className="text-white text-lg no-underline ml-4 hover:underline underline-offset-4 decoration-2"
                            to='/profile'
                            onClick={() => {
                                if (location.pathname === '/add/init')
                                    handleBeforeUnload()
                                props.onClose()
                            }}
                        >
                            Edit Profile
                        </Link>
                    </div>
                    <div className="flex my-4"
                    >
                        <FontAwesomeIcon icon={faBlog} size="xl" color="white" />
                        <Link className="text-white text-lg no-underline ml-4 hover:underline underline-offset-4 decoration-2"
                            to='my-blogs'
                            onClick={() => {
                                if (location.pathname === '/add/init')
                                    handleBeforeUnload()
                                props.onClose()
                            }}

                        >
                            My Blogs
                        </Link>
                    </div>
                    <div className="flex mb-4"
                    >
                        <FontAwesomeIcon icon={faBookmark} size="xl" color="white" />
                        <Link className="text-white text-lg no-underline ml-5 hover:underline underline-offset-4 decoration-2"
                            to='bookmark'
                            onClick={() => {
                                if (location.pathname === '/add/init')
                                    handleBeforeUnload()
                                props.onClose()
                            }}

                        >
                            My Bookmark
                        </Link>
                    </div>
                    <div className="flex mb-4"
                    >
                        <FontAwesomeIcon icon={faKey} size="xl" color="white" />
                        <Link className="text-white text-lg no-underline ml-4 hover:underline underline-offset-4 decoration-2"
                            to='/password'
                            onClick={() => {
                                if (location.pathname === '/add/init')
                                    handleBeforeUnload()
                                props.onClose()
                            }}
                        >
                            Change Password
                        </Link>
                    </div>
                    <div className="flex mb-4" onClick={() => {
                        LogoutAPI()
                        navigation('/')
                        window.location.reload()
                    }}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" color="white" />
                        <Link className="text-white text-lg no-underline ml-4 hover:underline underline-offset-4 decoration-2">
                            Log out
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default MenuDropdown
