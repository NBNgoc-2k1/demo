import { FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField } from '@mui/material'
import React, { useState } from 'react'
import AppButton from '../../../global_component/AppButton'
import isEmail from 'validator/lib/isEmail';
import { RegisterAPI } from '../../../api/AuthAPI'
import { useAuth } from '../../../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [authPopup, setAuthPopup] = useAuth()
    const [showPass, setShowPass] = useState(false)

    const RegisterUser = (email, pass, lastname, firstname) => {
        if (!isEmail(email) || pass.length < 8 || lastname === '' || firstname === '')
            return
        var newUser = {
            'userEmail': email,
            'lastName': lastname,
            'firstName': firstname,
            'username': `${lastname} ${firstname}`,
            "blogs": [],
            'bookmark':[]
        }
        RegisterAPI(newUser, pass);
        props.onClose()
    }

    function toggleShowPass() {
        setShowPass(!showPass)
    }

    function toggleAuthState(value) {
        setAuthPopup((previousState) => {
            return {
                ...previousState, authState: value
            }
        })
        setEmail('')
        setPass('')
        setLastname('')
        setFirstname('')
    }

    window.addEventListener('keydown', (event) => {
        if (event.code === 'Enter') {
            RegisterUser(email, pass, lastname, firstname)
        }
    })


    return (
        <div className="flex flex-col items-center justify-center mt-4">
            <div className="flex mt-3 mb-2 text-lg max-[414px]:text-sm">
                <p>Already have an account?</p>
                <p onClick={() => {
                    toggleAuthState('login')
                }}
                    className="ml-2 text-brown cursor-pointer 
            hover:decoration-brown hover:underline hover:decoration-2 hover:underline-offset-8"
                >Login</p>
            </div>
            <div className="flex my-2 sm:my-4 text-lg sm:text-2xl">
                <p className=" mr-2">Create Your</p>
                <Link
                    underline="none"
                    href="/"
                    className="hover:underline hover:decoration-2 hover:underline-offset-8"
                >MythWorld</Link>
                <p className="ml-2">Account</p>
            </div>
            <div className="w-72 m-auto">
                <TextField
                    id="outlined-firstname-input"
                    label="Firstname"
                    type="text"
                    fullWidth
                    margin='normal'
                    size="small"
                    value={firstname}
                    onChange={(event) => setFirstname(event.target.value)}
                    error={firstname === ""}
                    helperText={firstname === "" ? "Invalid firstname!" : " "}

                />
                <TextField
                    id="outlined-lastname-input"
                    label="Lastname"
                    type="text"
                    size="small"
                    fullWidth
                    margin='normal'
                    value={lastname}
                    onChange={(event) => setLastname(event.target.value)}
                    error={lastname === ""}
                    helperText={lastname === "" ? "Invalid lastname!" : " "}

                />
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    size="small"
                    fullWidth
                    margin='normal'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    error={(!isEmail(email))}
                    helperText={(!isEmail(email)) ? "Invalid email!" : " "}

                />
                <FormControl variant="outlined" margin='normal' fullWidth size='small'>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPass ? 'text' : 'password'}
                        onChange={(event) => setPass(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggleShowPass}
                                    edge="end"
                                >
                                    {showPass ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </div>
            <AppButton content="Register" onClick={() => {
                RegisterUser(email, pass, lastname, firstname)
            }} />
        </div>
    )
}

export default Register
