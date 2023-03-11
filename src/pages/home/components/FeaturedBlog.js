import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppButton from '../../../global_component/AppButton'
import { faArrowRight, faClock, faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import '../../add/editor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '../../../global_component/IconButton';

const FeaturedBlog1 = (props) => {
    const [datePost, setDatePost] = useState('')
    useEffect(() => {
        const date = new Date(props.item.createdAt.seconds * 1000);
        var dateString = date.toDateString()
        dateString = dateString.substring(4, dateString.length)
        setDatePost(dateString)
    }, [])

    return (
        <div className={`${props.className} relative sm:bg-brown flex`}>
            <img className="w-full h-auto md:w-7/12"
                src={props.item.coverPhoto}
                alt="blog avatar"
            />
            <div className="flex flex-col justify-center items-baseline 
                ml-10 mx-5 p-3 bg-brown rounded-2xl opacity-90 w-1/2 bottom-6
                max-md:absolute md:w-5/12
                lg:ml-20
            ">
                <p className="mt-2 text-white
                    text-xl
                    sm:text-3xl
                    lg:text-5xl">
                    {props.item.blogTitle}
                </p>
                <div className="flex sm:hidden">
                    <FontAwesomeIcon icon={faClock} className="text-white mt-1 md:mt-2 md:mr-2" />
                    <p className="text-sm ml-1 min-[361px]:text-base text-white">{datePost}
                    </p>
                </div>                
                <div className="flex sm:hidden w-full items-center justify-between">
                    <div className='flex'>
                        <FontAwesomeIcon icon={faEye} className="text-white mt-2" />
                        <p className="text-white text-lg ml-1 mr-2">{props.item.totalView}</p>
                        <FontAwesomeIcon icon={faHeart} className="text-white mt-2" />
                        <p className="text-white text-lg ml-1 mr-2">{props.item.like.length}</p>
                    </div>
                    <IconButton icon={faArrowRight} className="bg-teal w-10 h-10" iconClass="text-white text-xl m-3"
                        onClick={props.onClick}
                    />
                </div>
                <span className='text-white text-base w-3/4 hidden 
                    sm:line-clamp-2
                    md:line-clamp-3
                    lg:text-lg lg:w-4/5 lg:my-6'
                >
                    {props.item.content.split('</p>')[0].replace('<p>', '')}
                </span>
                <AppButton className='hidden mb-0 sm:flex' content="explore" icon={faArrowRight} onClick={props.onClick} />
            </div>
        </div>
    )
}

FeaturedBlog1.propTypes = {
    avatarSrc: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default FeaturedBlog1
