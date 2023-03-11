import React, { useEffect, useState } from 'react'
import { Alert, IconButton, FormControl, InputAdornment, InputLabel, Input, Snackbar, TextField } from '@mui/material'
import AppButton from '../../../global_component/AppButton';
import { authentication } from '../../../firebase-config'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from '@firebase/auth';
import { LogoutAPI } from '../../../api/AuthAPI'
import RequiredAuth from '../../requiredAuth/screens/RequiredAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const ChangePassword = (props) => {
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassCorrect, setOldPassCorrect] = useState(true)
    const [successedChange, setSuccessedChange] = useState(false);
    const [showPass, setShowPass] = useState(false)

    const submitChangePassword = async (newPassword, oldPassword) => {
        const loggedUser = authentication.currentUser
        const credential = await EmailAuthProvider.credential(loggedUser.email, oldPassword)
        reauthenticateWithCredential(loggedUser, credential)
            .then(() => {
                setOldPassCorrect(true)
                updatePassword(loggedUser, newPassword).then(() => {
                    LogoutAPI()
                    window.location.reload()
                    setSuccessedChange(true)
                })
            })
            .catch((error) => {
                alert(error.message)
                setOldPassCorrect(false)
            })
    }

    function toggleShowPass() {
        setShowPass(!showPass)
    }

    useEffect(() => {
        if (newPassword === '') {
            setConfirmPassword('')
        }
    }, [newPassword])

    return (
        <div>
            {
                props.user ? (
                    <>
                        {!oldPassCorrect && <Alert severity="error" variant="filled" sx={{fontSize:'20'}} className="w-4/5 sm:w-2/5 mt-4 ml-4" onClose={() => { setOldPassCorrect(true) }}>
                            Old password is incorrect - <strong>check it out!</strong>
                        </Alert>}
                        {(newPassword !== confirmPassword) && <Alert severity="error" variant="filled" className="w-4/5  sm:w-2/5 mt-4 ml-4">
                            Confirm password and new password are't same - <strong>check it out!</strong>
                        </Alert>}
                        <div className="flex flex-col items-center justify-center my-12">
                            <p className="text-brown text-4xl min-[414px]:text-5xl">Change Password</p>
                            <div className="w-[20rem] min-[414px]:w-[22rem] rounded-3xl my-6 pb-6 bg-dark-silver flex flex-col items-center justify-center">
                                <TextField
                                    id="outlined-firstname-input"
                                    label="Old Password"
                                    type="password"
                                    size="small"
                                    onChange={(event) => setOldPassword(event.target.value)}
                                    margin="normal"
                                    value={oldPassword}
                                    variant="standard"
                                />
                                <FormControl variant="standard" className='max-[360px]:w-3/5 w-[55%]' size='small' >
                                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                    <Input
                                        id="outlined-adornment-password"
                                        type={showPass ? 'text' : 'password'}
                                        onChange={(event) => setNewPassword(event.target.value)}
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
                                        label="New Password"
                                    />
                                </FormControl>
                                <FormControl variant="standard" className='max-[360px]:w-3/5 w-[55%]' margin='normal' size='small' >
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                    <Input
                                        id="outlined-adornment-password"
                                        type={showPass ? 'text' : 'password'}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
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
                                        label="Confirm Password"
                                    />
                                </FormControl>
                            </div>
                            <AppButton content="save" disabled={!((newPassword !== '') && (confirmPassword === newPassword))}
                                onClick={() => {
                                    submitChangePassword(newPassword, oldPassword)
                                }}
                            />
                        </div>
                        <Snackbar open={successedChange}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            autoHideDuration={3000}
                            onClose={() => {
                                setSuccessedChange(false)
                            }}
                        >
                            <Alert variant="filled"
                                severity="success"
                                onClose={() => {
                                    setSuccessedChange(false)
                                }}
                            >Change password succesfully</Alert>
                        </Snackbar>
                    </>
                ) : (
                    <RequiredAuth />
                )
            }
        </div>
    )
}

export default ChangePassword
