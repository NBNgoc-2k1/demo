import { faArrowRight, faClock, faEye, faHeart, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AppButton from './AppButton'
import { useNavigate } from 'react-router'
import IconButton from './IconButton'
import { DeleteBlogById } from '../api/CRUD_API'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BlogCard = (props) => {
    const [datePost, setDatePost] = useState('')
    const navigation = useNavigate()
    const [confirmDelete, setConfirmDelete] = useState(false);

    const toggleConfirmPopup = () => {
        setConfirmDelete(!confirmDelete)
    }

    useEffect(() => {
        const date = new Date(props.item.createdAt.seconds * 1000);
        var dateString = date.toDateString()
        dateString = dateString.substring(4, dateString.length)
        setDatePost(dateString)
    }, [])

    return (
        <div className="bg-brown rounded-2xl w-48 sm:w-52 md:w-64
            lg:w-72 m-4
        ">
            <div className="relative min-[414px]:h-32
                md:h-40
                lg:h-48"
            >
                <img
                    src={props.item.coverPhoto}
                    alt="blog avatar"
                    className="rounded-t-2xl w-full h-full"
                />
                {props.isEdit && (
                    <div>
                        <IconButton
                            className="blogcard_iconbtn sm:left-[80%] lg:left-[85%]"
                            icon={faPen}
                            iconClass="text-base md:text-lg"
                            onClick={() => navigation(`/add/${props.item.id}`)}

                        />
                        <IconButton
                            icon={faTrashAlt}
                            className="blogcard_iconbtn sm:left-[60%] lg:left-[68%]"
                            iconClass="text-base md:text-lg"
                            onClick={() => {
                                toggleConfirmPopup()
                            }}
                        />
                    </div>
                )}
            </div>
            <div className="m-4">
                <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl">
                    {props.item.blogTitle}
                </p>
                <div className='flex'>
                    <div className="flex">
                        <FontAwesomeIcon icon={faEye} className="text-white mt-1.5" />
                        <p className="text-white text-lg ml-1">{props.item.totalView}</p>
                    </div>
                    <div className="flex ml-4">
                        <FontAwesomeIcon icon={faHeart} className="text-white mt-1.5" />
                        <p className="text-white text-lg ml-1">{props.item.like.length}</p>
                    </div>
                </div>
                <div className="hidden md:flex">
                    <FontAwesomeIcon icon={faClock} className="text-white mt-1.5 mr-1" />
                    <p className="text-white text-lg">{datePost}</p>
                </div>
                <div className='flex justify-between items-end md:hidden'>
                    <div className="flex">
                        <FontAwesomeIcon icon={faClock} className="text-white mt-1 md:mt-2 md:mr-2" />
                        <p className="text-white md:text-lg ml-1">{datePost}</p>
                    </div>
                    <IconButton icon={faArrowRight} className='h-9 w-9 md:hidden bg-teal' 
                        iconClass='text-white text-lg m-2.5 md:m-3'
                        onClick={() => {
                            navigation(`/blogs/${props.item.id}`)
                        }}
                    />
                </div>
                <AppButton content="explore" icon={faArrowRight} className='hidden md:flex' onClick={() => {
                    navigation(`/blogs/${props.item.id}`)
                }} />
            </div>
            <Dialog open={confirmDelete} onClose={toggleConfirmPopup}>
                <DialogTitle className="bg-brown text-center text-white" sx={{ fontSize:'1.5rem'}}>Delete Blog</DialogTitle>
                <DialogContent sx={{ marginTop: '1.25em',fontSize:'1.25rem' }}>
                    <p className="">Are you sure you want to delete this blog?</p>
                </DialogContent>
                <DialogActions>
                    <AppButton content="cancel" onClick={() => toggleConfirmPopup()} />
                    <AppButton content="confirm" className="bg-dark-grey" onClick={() => {
                        DeleteBlogById(props.item.id)
                    }} />
                </DialogActions>
            </Dialog>
        </div>
    )
}

BlogCard.propTypes = {
    item: PropTypes.object.isRequired,
    isEdit: PropTypes.bool.isRequired,
}

export default BlogCard
