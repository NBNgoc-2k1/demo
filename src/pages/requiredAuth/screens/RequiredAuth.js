import { faUserLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import AppButton from '../../../global_component/AppButton'
import { useAuth } from '../../../hooks'
import authen from '../../../assets/images/error_image/authentication.png'

const RequiredAuth = () => {
    const [authPopup, setAuthPopup] = useAuth()

    return (
        <div className="lg:flex items-center justify-around py-8">
            <div>
                <img
                    src={authen}
                    alt="Authen"
                    className="w-52 lg:w-64 xl:w-80 mx-auto"
                />
            </div>
            <div className="flex flex-col items-baseline justify-center lg:w-2/3 max-lg:mx-auto
                lg:mt-20
            ">
                <p className="text-brown max-lg:mx-auto text-xl sm:text-3xl xl:text-4xl">AUTHENTICATION REQUIRED PAGE</p>
                <p className="max-sm:hidden max-lg:mx-auto w-8/12 my-8 text-lg max-lg:text-center min-[414px]:text-xl lg:max-w-4xl leading-relaxed">
                    This page contains information or benefits that require a MythWorld account.
                    So please login or register to experience. <br/> Sincere thanks to everyone's contributions to Myth World
                </p>
                <AppButton content="Login/Register" className='max-lg:mx-auto' onClick={() => {
                    setAuthPopup((previousState) => {
                        return {
                            ...previousState, open: !authPopup.open
                        }
                    })
                }} />
            </div>
        </div>
    )
}

export default RequiredAuth
