import React from 'react'

const Title = (props) => {
    return (
        <div className={`flex ${props.className} items-center `}>
            <div className={`bg-dark-silver h-6 ${props.barClass}`}></div>
            <p className="text-dark-grey text-center px-6 md:px-10"
            >{props.title}</p>
            <div className={`bg-dark-silver h-6 ${props.barClass}`}></div>
        </div>
    )
}



export default Title
