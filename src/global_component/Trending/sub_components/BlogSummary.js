import { faArrowRight, faClock, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import IconButton from '../../IconButton';

const BlogSummary = (props) => {
    const [datePost, setDatePost] = useState('')
    const navigation = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleWindowResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [windowWidth]);


    useEffect(() => {
        const date = new Date(props.item.createdAt.seconds * 1000);
        var dateString = date.toDateString()
        dateString = dateString.substring(4, dateString.length)
        setDatePost(dateString)
    }, [])

    return (
        <div className="flex my-4 bg-brown max-sm:w-64 w-[23rem] lg:max-xl:w-64 2xl:w-[30rem] rounded-2xl"
            style={{backgroundImage: ((windowWidth < 1280 && windowWidth >= 1024) || windowWidth < 640) ? `url(${props.item.coverPhoto})` : 'none'}}
        >
            <img className="m-0 w-28 2xl:w-32 h-auto rounded-l-2xl max-sm:hidden lg:max-xl:hidden"
                src={props.item.coverPhoto}
            />
            <div className="flex items-end xl:justify-evenly w-full">
                <div className="flex flex-col mt-4 w-48 2xl:w-[18rem]">
                    <p className="text-xl 2xl:text-3xl text-white ml-6">{props.item.blogTitle}</p>
                    <div className="flex ml-6">
                        <FontAwesomeIcon icon={faClock} className="text-white mt-1" />
                        <p className="text-md text-white ml-2">{datePost}</p>
                    </div>
                    <div className="flex my-2">
                        <FontAwesomeIcon icon={faHeart} className="text-white ml-6 mt-2" />
                        <p className="text-white text-lg ml-2 ">{props.item.like.length}</p>
                    </div>
                </div>
                <IconButton icon={faArrowRight} className="bg-teal w-12 h-12 mb-3" iconClass="text-white text-xl m-3.5"
                    onClick={() => navigation(`/blogs/${props.item.id}`)}
                />
            </div>
        </div>
    )
}

export default BlogSummary
