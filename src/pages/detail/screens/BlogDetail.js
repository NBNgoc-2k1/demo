import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { GetSingleData, GetAllOrderedBlogs, UpdateData } from '../../../api/CRUD_API'
import Loading from '../../../global_component/Loading'
import Error from '../../error/Error'
import parser from 'html-react-parser'
import '../../add/editor.css'
import Trending from '../../../global_component/Trending/Trending'
import BlogPart from '../../../global_component/BlogPart/BlogPart'
import IconButton from '../../../global_component/IconButton'
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faUnHeart, faBookmark as faUnBookmark } from '@fortawesome/free-regular-svg-icons'


const BlogDetail = (props) => {
    let { id } = useParams()
    const [requiredBlog, setRequiredBlog] = useState(null)
    const [sameAuthorBlogs, setSameAuthorBlogs] = useState([])
    const [isCurrentUserLike, setCurrentUserLike] = useState(false)
    const [isCurrentUserBookmark, setCurrentUserBookmark] = useState(false)

    const toggleInteractionBlog = (field) => {
        switch (field) {
            case 'bookmark':
                setCurrentUserBookmark(!isCurrentUserBookmark)
                {
                    isCurrentUserBookmark ? props.user[field] = props.user[field].filter(blogId => blogId !== id)
                        : props.user[field].push(id)
                }
                localStorage.setItem('currentUser', JSON.stringify(props.user))
                UpdateData(props.user.uid,'users',JSON.parse(localStorage.getItem('currentUser')),() => {})
                break;
            case 'like':
                {
                    !isCurrentUserLike ? requiredBlog[field].push(props.user.uid)
                        : requiredBlog[field] = requiredBlog[field].filter(uid => uid !== props.user.uid)
                }
                setCurrentUserLike(!isCurrentUserLike)
                UpdateData(id, 'blogs', requiredBlog, () => { })
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        GetSingleData('blogs',id).then((returnedBlog) => {
            setRequiredBlog(returnedBlog)
            if (props.user) {
                setCurrentUserLike(returnedBlog.like.indexOf(props.user.uid) !== -1 ? true : false)
                setCurrentUserBookmark(props.user.bookmark.indexOf(id) !== -1 ? true : false)
            }
            UpdateData(id, 'blogs', { ...returnedBlog, totalView: returnedBlog.totalView + 1 }, () => { })
            GetAllOrderedBlogs('createdAt').then((allBlogs) => {
                var tempBlogs = allBlogs
                    .filter(blog => blog.author.uid === returnedBlog.author.uid)
                    .filter(blog => blog.id !== id)
                tempBlogs.length === 0 && tempBlogs.push(returnedBlog)
                setSameAuthorBlogs(tempBlogs)
            })
        })
        .catch(error => setRequiredBlog(undefined))
    }, [id])

    const options = {
        replace: (domNode) => {
            if (domNode.attribs && domNode.attribs.class === 'remove') {
                return <></>;
            }
        },
    };

    const formattedDate = (dateSeconds) => {
        const date = new Date(dateSeconds * 1000);
        var dateString = date.toDateString()
        return dateString.substring(4, dateString.length)
    }

    return (
        <>
            {requiredBlog ? (
                <>
                    <div className="flex mx-6 lg:ml-14">
                        <div className="w-full lg:w-7/12">
                            <div className="bg-dark-grey flex mt-4 relative rounded-t-2xl sm:static">
                                <div className="max-sm:absolute text-white flex flex-col justify-end
                                    m-4 max-sm:bg-brown max-sm:rounded-2xl opacity-80 bottom-0
                                    sm:w-1/2">
                                    <p className="my-2 text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl sm:my-4">{requiredBlog.blogTitle}</p>
                                    <div className='flex'>
                                        <p className="my-2 text-sm sm:text-base 2xl:text-lg sm:my-4">
                                            {formattedDate(requiredBlog.createdAt.seconds)} by {requiredBlog.author.name}
                                        </p>
                                        <IconButton icon={(isCurrentUserLike || !props.user) ? faHeart : faUnHeart}
                                            className={`${props.user ? 'cursor-pointer' : 'cursor-default pointer-events-none'} mx-3 mt-2 sm:mt-4`}
                                            iconClass={`text-xl sm:text-2xl ${!props.user && 'text-teal'} 
                                                    ${isCurrentUserLike ? 'text-teal' : 'text-white'}
                                            `}
                                            onClick={() => toggleInteractionBlog('like')}
                                        />
                                        <p className='text-xl sm:text-3xl mt-1 sm:mt-2 mr-3'>
                                            {requiredBlog.like.length}
                                        </p>
                                        {props.user && <IconButton icon={isCurrentUserBookmark ? faBookmark : faUnBookmark}
                                            className='mx-2 mt-2 sm:mt-3.5'
                                            iconClass={`text-xl sm:text-2xl ${isCurrentUserBookmark ? 'text-teal' : 'text-white'}`}
                                            onClick={() => toggleInteractionBlog('bookmark')}
                                        />}
                                    </div>
                                </div>
                                <img src={requiredBlog.coverPhoto}
                                    className="w-full rounded-2xl sm:h-[19rem] sm:w-1/2 sm:rounded-tr-2xl sm:rounded-none"
                                />
                            </div>
                            <div className="ql-snow bg-dark-silver lg:mb-4 rounded-b-2xl">
                                <div className="ql-editor editor-container">
                                    {parser(requiredBlog.content, options)}
                                </div>
                            </div>
                        </div>
                        <Trending className="max-lg:hidden w-5/12 relative lg:left-8 lg:top-[20rem]" />
                    </div>
                    <BlogPart title='Same Author' data={sameAuthorBlogs} />
                </>
            ) : (
                <>
                    {(requiredBlog === null) && <Loading />}
                    {(requiredBlog === undefined) && <Error />}
                </>
            )}
        </>
    )
}

export default BlogDetail
