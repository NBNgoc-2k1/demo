import { Alert, Link, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AppButton from '../../../global_component/AppButton'
import isEmail from 'validator/lib/isEmail';
import { useAuth } from '../../../hooks'
import { GetAllUser } from '../../../api/CRUD_API';
import { sendPasswordResetEmail } from '@firebase/auth';
import { authentication } from '../../../firebase-config';

const Reset = () => {
    const [email, setEmail] = useState("");
    const [userList, setUserList] = useState([]);
    const [isUserExist, setUserExist] = useState(true);
    const [sendSuccess, setSendSuccess] = useState(false);
    const [authPopup, setAuthPopup] = useAuth()

    const CheckUserExist = (userEmail) => {
        userList.map(user => {
            if (Object.values(user).indexOf(userEmail) === -1)
                setUserExist(false)
            else {
                setUserExist(true)
                sendPasswordResetEmail(authentication,userEmail).then(() => {
                    toggleAuthState('login')
                    setSendSuccess(true)
                })
                .catch((e) => {
                    alert(e.message)
                })
                return
            }
        })
    }

    useEffect(() => {
        GetAllUser().then((users) => setUserList(users))
    }, [])

    function toggleAuthState(value) {
        setAuthPopup((previousState) => {
            return {
                ...previousState, authState: value
            }
        })
    }

    return (
        <div className="flex flex-col items-center justify-center my-24">
            <Snackbar
                open={sendSuccess}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={() => {
                    setSendSuccess(false)
                }}
            >
                <Alert variant="filled" sx={{fontSize:'20'}}
                    severity="success"
                    onClose={() => {
                        setSendSuccess(false)
                    }}>
                    Send password reset email succesfully
                </Alert>
            </Snackbar>
            <Snackbar
                open={!isUserExist}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={() => {
                    setUserExist(true)
                }}
            >
                <Alert variant="filled" sx={{fontSize:'20'}}
                    severity="error"
                    onClose={() => {
                        setUserExist(true)
                    }}>
                    Email has never registered. Check email you typed
                </Alert>
            </Snackbar>
            <div className="flex my-4 text-lg sm:text-2xl ">
                <p className="mr-2">Reset Your</p>
                <Link
                    underline="none"
                    href="/"
                    className="hover:underline hover:decoration-2 hover:underline-offset-8"
                >MythWorld</Link>

                <p className="ml-2">Password</p>
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
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                    error={(!isEmail(email))}
                    helperText={(!isEmail(email)) ? "Invalid email!" : " "}
                />

            </div>
            <div className="flex sm:text-lg">
                <p>Back to</p>
                <p onClick={() => {
                    toggleAuthState('login')
                }}
                    className="ml-2 text-brown cursor-pointer 
            hover:decoration-brown hover:underline hover:decoration-2 hover:underline-offset-8"
                >Login</p>
            </div>
            <AppButton content="reset" disabled={!isEmail(email)} className="lg:w-24" onClick={() => {
                CheckUserExist(email)
            }} />
        </div>
    )
}

export default Reset
