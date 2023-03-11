import { FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField } from '@mui/material'
import React, { useState } from 'react'
import AppButton from '../../../global_component/AppButton'
import isEmail from 'validator/lib/isEmail';
import { LoginAPI } from '../../../api/AuthAPI'
import { authentication } from '../../../firebase-config';
import { useAuth, useUser } from '../../../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [authPopup, setAuthPopup] = useAuth()
    const [showPass, setShowPass] = useState(false)



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
    }

    return (
        <div className="flex flex-col items-center justify-center my-16">
            <div className="flex text-lg max-[414px]:text-base">
                <p>Don't have an account?</p>
                <p onClick={() => {
                    toggleAuthState('register')
                }}
                    className="ml-2 text-brown cursor-pointer 
                    hover:decoration-brown hover:underline hover:decoration-2 hover:underline-offset-8"
                >Register</p>
            </div>
            <div className="flex my-4 text-3xl">
                <p className="mr-2">Login to</p>
                <Link
                    underline="none"
                    href="/"
                    className="hover:underline hover:decoration-2 hover:underline-offset-8"
                >MythWorld</Link>
            </div>
            <div className="w-72 m-auto">
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
                <p onClick={() => {
                    toggleAuthState('reset')
                }}
                    className="ml-2 text-dark-grey cursor-pointer text-center text-lg
                    hover:decoration-dark-grey hover:underline hover:decoration-2 hover:underline-offset-8"
                >Forgot your password?</p>
            </div>
            <AppButton content="Login" className="lg:w-24" disabled={!(isEmail(email) && (pass !== ''))}
                onClick={() => {
                    LoginAPI(email, pass, () => setPass(''),() => props.onClose())
                }} />
        </div>
    )
}

export default Login
