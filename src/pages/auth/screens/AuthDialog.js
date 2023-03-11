import auth_image from '../../../assets/images/auth_images/cosmic+shiva+by+android+jones.jpg'
import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import Reset from '../components/Reset'
import { useAuth } from '../../../hooks'
import IconButton from '../../../global_component/IconButton'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const AuthDialog = () => {
    const [authPopup, setAuthPopup] = useAuth()

    function toggleOpenAuthDialog() {
        setAuthPopup(() => {
            return {
                open: !authPopup.open, authState: 'login'
            }
        })
        document.body.style.overflowY = ""
    }

    return (
        <div className={`w-full h-screen inset-0 fixed ${authPopup.open ? 'flex' : 'hidden'} z-20 items-center justify-center`}>
            <div className="fixed inset-0 -z-10 bg-dark-grey opacity-60" onClick={toggleOpenAuthDialog}></div>
            <IconButton icon={faClose} className='absolute left-[85%]
                top-[15%]
                sm:top-[27%]
                lg:top-[20%]
                xl:top-[14%]
                xl:left-[80%]
            ' iconClass='text-3xl text-teal lg:text-white'
                onClick={toggleOpenAuthDialog}
            />
            <div className="flex w-5/6 bg-light-silver rounded-xl h-[73%]
                sm:h-1/2 sm:w-4/5
                lg:h-2/3
                xl:h-3/4 xl:w-2/3
                2xl:h-[75%]
            ">
                <div className="w-full lg:w-5/12 my-2">
                    {(authPopup.authState === 'login') && <Login onClose={toggleOpenAuthDialog} />}
                    {(authPopup.authState === 'register') && <Register onClose={toggleOpenAuthDialog} />}
                    {(authPopup.authState === 'reset') && <Reset onClose={toggleOpenAuthDialog} />}
                </div>
                <img className="max-lg:hidden lg:w-7/12 rounded-r-xl m-0"
                    src={auth_image}
                    alt="god in auth"
                />
            </div>
        </div>
    )
}

export default AuthDialog
