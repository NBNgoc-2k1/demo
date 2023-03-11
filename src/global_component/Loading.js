import React from 'react'
import taiji from '../assets/images/error_image/error404.png'

const Loading = () => {
    return (
        <div className="flex flex-col items-center my-12 h-72">
            <img
                src={taiji}
                alt="Taiji"
                className="rotate h-auto"
            />
            <p className="text-brown m-auto text-3xl sm:text-5xl"
            >Entering Myth World ...</p>
        </div>
    )
}

export default Loading
