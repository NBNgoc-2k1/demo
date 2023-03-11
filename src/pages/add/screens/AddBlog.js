import { Snackbar, Alert, TextField, Dialog, DialogTitle, } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AppButton from '../../../global_component/AppButton';
import ImageUploadPopup from '../components/ImageUploadPopup'
import PreviewPhotoPopup from '../components/PreviewPhotoPopup'
import ImageEdit from 'quill-image-edit-module';
import parser from 'html-react-parser'
import { useBlog } from '../../../hooks'
import { useParams } from 'react-router';
import { AddBlogData, GetSingleData, UpdateData } from '../../../api/CRUD_API';
import { authentication } from '../../../firebase-config'
import RequiredAuth from '../../requiredAuth/screens/RequiredAuth';
import Dropdown from '../../../global_component/Dropdown/Dropdown'
import { faBlog, faImage } from '@fortawesome/free-solid-svg-icons';

// Config rich text editor
function ImageHandler() {
    var range = this.quill.getSelection();
    var value = prompt('Image URL');
    if (value) {
        this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }
}

const toolbarOptions = [
    [{ 'header': [2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],        // toggled buttons
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    ['image', 'link'],

    ['clean']                                         // remove formatting button
]

const modules = {
    toolbar: {
        container: toolbarOptions,
        handlers: {
            image: ImageHandler
        }
    },
    imageEdit: {
        modules: ["Resize", "DisplaySize", "Toolbar", "Delete"]
    }
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'blockquote',
    'align',
    'list', 'bullet',
    'link', 'image',
    'color', 'background'
]

let quill = null
Quill.register("modules/imageEdit", ImageEdit);

// render component
const AddBlog = (props) => {
    // Feedback state
    const [successedPublish, setSuccessedPublish] = useState(false);

    // blog state
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('')
    const [blogView, setBlogView] = useState(0)
    const [likeUsers, setLikeUsers] = useState([])
    const [bookmarkByUser, setBookmarkByUser] = useState([])
    const [blogData, setBlogData] = useBlog()
    const { id } = useParams()
    const categoryList = ['creation', 'event', 'period', 'character', 'place']
    const regionsList = ['global', 'greek', 'norse', 'egyptian', 'chinese']

    const quillEl = useRef(null);

    // toggle popup state
    const [previewBlogOpen, setPreviewBlogOpen] = useState(false);
    const [imagePopupOpen, setImagePopupOpen] = useState(false)
    const [previewPopupOpen, setPreviewPopupOpen] = useState(false);

    // config for preview popup
    const options = {
        replace: (domNode) => {
            if (domNode.attribs && domNode.attribs.class === 'remove') {
                return <></>;
            }
        },
    };

    const clearInputField = () => {
        setSuccessedPublish(true);
        setBlogContent('')
        setBlogTitle('')
        setBlogView(0)
        setLikeUsers([])
        setBookmarkByUser([])
        setBlogData((previousState) => {
            return {
                ...previousState, coverPhotoSrc: ''
            }
        })
    }

    // render rich text editor
    useEffect(() => {
        if (props.user) {
            const quillRef = quillEl.current
            if (quillRef) {
                quill = quillRef.getEditor()
            }
        }
    }, [])

    function toggleImagePopup() {
        setImagePopupOpen(!imagePopupOpen)
    }

    const handleEditorChange = (value) => {
        setBlogContent(value);
        if (value === '<p><br></p>')
            setBlogContent('')
    }

    const handleBeforeUnload = (e) => {
        e.preventDefault();
        const message =
            "Are you sure you want to leave? All provided data will be lost.";
        e.returnValue = message;
        return message;
    };

    const SetBlogData = (blog) => {
        setBlogTitle(blog.blogTitle)
        setBlogContent(blog.content)
        setBlogView(blog.totalView)
        setLikeUsers(blog.like)
        setBookmarkByUser(blog.bookmark)
        setBlogData((previousState) => {
            return {
                ...previousState, coverPhotoSrc: blog.coverPhoto
            }
        })
    }

    // Get blog data if available
    useEffect(() => {
        GetSingleData('blogs', id).then((existedBlog) => {
            if (existedBlog)
                SetBlogData(existedBlog)
            return
        })
    }, [id])

    // Handle navigate or reload event
    useEffect(() => {
        if (props.user) {
            window.addEventListener("beforeunload", handleBeforeUnload);
            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
        }
    }, [])

    return (
        <>
            {
                props.user ? (
                    <>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={successedPublish}
                            autoHideDuration={3000}
                            onClose={() => {
                                setSuccessedPublish(false)
                            }}
                        >
                            <Alert sx={{fontSize:'20'}}
                                variant="filled"
                                severity="success"
                                onClose={() => {
                                    setSuccessedPublish(false)
                                }}
                            >Publish your myth succesfully</Alert>
                        </Snackbar>
                        <p className="text-brown mb-4 mt-8 text-3xl sm:text-4xl lg:text-5xl text-center">
                            Create Your Myth
                        </p>
                        <div className="mx-8 sm:mx-28 xl:mx-64 2xl:mx-96">
                            <div className="mt-7 mx-16 min-[414px]:mx-20 sm:mx-28 md:mx-48 lg:mx-72">
                                <TextField
                                    value={blogTitle}
                                    type="text"
                                    size="small"
                                    variant="standard"
                                    placeholder="Enter Blog Title"
                                    onChange={(e) => setBlogTitle(e.target.value)}
                                    inputProps={{ style: { fontSize: 20 } }}
                                    InputLabelProps={{ style: { fontSize: 20 } }}
                                />
                            </div>
                            <div className="lg:flex justify-between items-start my-4">
                                <div className='flex justify-between'>
                                    <AppButton icon={faImage}
                                        content="add"
                                        onClick={toggleImagePopup}
                                        className='mx-2'
                                    />
                                    <AppButton icon={faImage} content="preview" disabled={(blogData.coverPhotoSrc === '')}
                                        onClick={() => {
                                            setPreviewPopupOpen(true)
                                        }}
                                    />
                                    <ImageUploadPopup open={imagePopupOpen} onClose={toggleImagePopup} />
                                    <PreviewPhotoPopup open={previewPopupOpen} onClose={setPreviewPopupOpen}
                                        imgSrc={blogData.coverPhotoSrc}
                                    />
                                </div>
                                <div className='flex justify-between'>
                                    <Dropdown label='Category' defaultValue={blogData.category}
                                        dataSet={categoryList} className='w-40 max-lg:mx-2' />
                                    <Dropdown label='Region' defaultValue={blogData.region}
                                        dataSet={regionsList} className='w-40 lg:mx-4' />
                                </div>
                            </div>
                            <ReactQuill
                                ref={quillEl}
                                theme='snow'
                                value={blogContent}
                                modules={modules}
                                formats={formats}
                                onChange={handleEditorChange}
                                className="my-8"
                            />
                            <div className="flex">
                                <AppButton content='publish'
                                    icon={faBlog}
                                    className="mr-2 sm:mx-2"
                                    disabled={(blogTitle !== '' && blogContent !== '' && blogData.coverPhotoSrc !== '') ? false : true}
                                    onClick={() => {
                                        const newData = {
                                            'blogTitle': blogTitle,
                                            'coverPhoto': blogData.coverPhotoSrc,
                                            'content': blogContent,
                                            'category': blogData.category.toLowerCase(),
                                            'region': blogData.region.toLowerCase(),
                                            'author': {
                                                uid: JSON.parse(localStorage.getItem('currentUser')).uid,
                                                name: authentication.currentUser.displayName
                                            },
                                            'totalView': blogView,
                                            'like': likeUsers,
                                            'bookmark': bookmarkByUser
                                        }
                                        if (id === 'init')
                                            AddBlogData(newData, clearInputField)
                                        else UpdateData(id, 'blogs', newData, clearInputField)
                                    }}
                                />
                                <AppButton content="preview"
                                    icon={faBlog}
                                    className="sm:mx-2"
                                    disabled={(blogTitle !== '' && blogContent !== '') ? false : true}
                                    onClick={() => { setPreviewBlogOpen(true) }}
                                />
                            </div>
                        </div>
                        <Dialog open={previewBlogOpen} onClose={() => setPreviewBlogOpen(false)} className="editor-container">
                            <DialogTitle className="bg-brown text-white text-center">
                                {blogTitle}
                            </DialogTitle>
                            <div className="ql-snow">
                                <div className="ql-editor">
                                    {parser(blogContent, options)}
                                </div>
                            </div>
                        </Dialog>
                    </>
                ) : (
                    <RequiredAuth />
                )
            }
        </>
    )
}

export default AddBlog
