import React from 'react'
import avt from '../../../assets/images/home_images/291119249_2002840966575129_602900069910579026_n.jpg'
import AppButton from '../../../global_component/AppButton'
import { useAuth } from '../../../hooks'

const Intro = (props) => {
    const [authPopup, setAuthPopup] = useAuth()

    function toggleOpenAuthDialog() {
        setAuthPopup((previousState) => {
            return {
                ...previousState, open: !authPopup.open
            }
        })
        document.body.style.overflowY = "hidden"
    }

    return (
        <div className={`relative bg-dark-grey flex-row-reverse
            hidden 
            sm:flex 
            md:flex-row`}
        >
            <div className={`mx-5 p-3 bg-dark-grey rounded-2xl opacity-80 w-1/2
                flex-col justify-center items-baseline flex 
                sm:top-36
                max-md:absolute md:w-5/12 md:top-0 md:ml-10 md:bg-transparent md:opacity-100 md:top-48 
                lg:ml-20
            `}>
                <p className="text-3xl text-white my-3">
                    WELCOME!
                </p>
                <p className="text-white text-base lg:text-lg
                    2xl:w-7/12
                    xl:w-2/3
                    md:w-5/6
                ">
                    A blog about mysteries for lovers worldwide. Sign up today to share your story with everybody.
                </p>
                {!props.user && <AppButton content="Login/Register" onClick={toggleOpenAuthDialog} />}
            </div>
            <img className={`md:w-7/12`}
                src={avt}
                alt="blog avatar"
            />
        </div>
    )
}

export default Intro
