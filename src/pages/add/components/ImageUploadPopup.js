import { Dialog, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AppButton from '../../../global_component/AppButton';
import { useBlog } from '../../../hooks'

const ImageUploadPopup = (props) => {
    const [tempSrc, setTempSrc] = useState('')
    const [blogData, setBlogData] = useBlog()

    const handleClose = () => {
        setBlogData((previousState) => {
            return {
                ...previousState, coverPhotoSrc: tempSrc
            }
        })
        setTempSrc('')
        props.onClose()
    };

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle className="bg-brown text-white text-center">Add Cover Photo</DialogTitle>
            <DialogContent sx={{ marginTop: '1.25em' }}>
                <TextField variant="standard" label="URL" type="url" size="small" value={tempSrc}
                    onChange={(e) => setTempSrc(e.target.value)}
                    className="mt-4" fullWidth
                    inputProps={{ style: { fontSize: 20 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}

                />
                <br />
                <AppButton content="add" className="lg:w-32 mx-auto" onClick={handleClose} />
            </DialogContent>
        </Dialog>
    )
}

export default ImageUploadPopup
