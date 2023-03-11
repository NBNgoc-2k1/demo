import React from 'react'
import {Dialog, DialogTitle, } from '@mui/material'

const PreviewPhotoPopup = ({onClose,open,imgSrc}) => {
    const handleClose = () => {
        onClose()
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="bg-brown text-white text-center">Cover Photo</DialogTitle>
            <img src={imgSrc}/>
        </Dialog>
    )
}

export default PreviewPhotoPopup
