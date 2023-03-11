import { faArrowRight, faClock, faEllipsis, faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, MenuItem, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import AppButton from './AppButton'
import { DeleteBlogById } from '../api/CRUD_API'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from './IconButton';

const BlogSlide = (props) => {
    const [datePost, setDatePost] = useState('')
    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const navigation = useNavigate()
    const [confirmDelete, setConfirmDelete] = useState(false);

    const toggleConfirmPopup = () => {
        setConfirmDelete(!confirmDelete)
    }

    const OpenBlogMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const CloseBlogMenu = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const date = new Date(props.item.createdAt.seconds * 1000);
        var dateString = date.toDateString()
        dateString = dateString.substring(4, dateString.length)
        setDatePost(dateString)
    }, [])

    return (
        <div className='flex m-4 bg-brown rounded-2xl'>
            <img className="m-0 w-28 min-[361px]:w-32 h-auto rounded-l-2xl"
                src={props.item.coverPhoto}
            />
            <div className='flex items-center justify-evenly w-full mr-1'>
                <div className="flex flex-col w-40 min-[414px]:w-44 mt-4 ml-2 sm:ml-4">
                    <p className="text-xl text-white">{props.item.blogTitle}</p>
                    <div className="flex">
                        <FontAwesomeIcon icon={faClock} className="text-white mt-1 md:mt-2 md:mr-2" />
                        <p className="ml-1 text-white">{datePost}
                        </p>
                    </div>
                    <div className='flex'>
                        <div className="flex mr-4 my-2">
                            <FontAwesomeIcon icon={faEye} className="text-white mt-1" />
                            <p className="text-white ml-2 ">{props.item.totalView}</p>
                        </div>
                        <div className="flex my-2">
                            <FontAwesomeIcon icon={faHeart} className="text-white mt-1" />
                            <p className="text-white ml-2">{props.item.like.length}</p>
                        </div>
                    </div>
                </div>
                <div className={`${props.isEdit && 'flex'} flex-col h-full justify-evenly `}>
                    <IconButton icon={faEllipsis}
                        className={`${!props.isEdit && 'hidden'} ml-1.5`}
                        iconClass='text-white text-3xl mt-1.5'
                        onClick={OpenBlogMenu}
                    />
                    <Menu open={openMenu}
                        anchorEl={anchorEl}
                        onClose={CloseBlogMenu}
                    >
                        <MenuItem onClick={() => {
                            navigation(`/add/${props.item.id}`)
                            CloseBlogMenu()
                        }}>Edit</MenuItem>
                        <MenuItem onClick={() => {
                            toggleConfirmPopup()
                            CloseBlogMenu()
                        }}>Delete</MenuItem>
                    </Menu>
                    <IconButton icon={faArrowRight}
                        className={`${!props.isEdit && 'mt-14'} bg-teal w-10 h-10`}
                        iconClass="text-white text-xl m-3"
                        onClick={() => navigation(`/blogs/${props.item.id}`)}
                    />
                </div>
            </div>
            <Dialog open={confirmDelete} onClose={toggleConfirmPopup}>
                <DialogTitle className="bg-brown text-center text-white" sx={{ fontSize: '1.5rem' }}>Delete Blog</DialogTitle>
                <DialogContent sx={{ marginTop: '1.25em', fontSize: '1.25rem' }}>
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

export default BlogSlide
