import React, { useEffect, useRef, useState } from 'react'
import BlogCard from '../../../global_component/BlogCard'
import sad_face from '../../../assets/images/error_image/sad_face.png'
import Loading from '../../../global_component/Loading';
import { GetSingleData } from '../../../api/CRUD_API';
import RequiredAuth from '../../requiredAuth/screens/RequiredAuth';
import Title from '../../../global_component/Title';
import BlogSlide from '../../../global_component/BlogSlide';

const Bookmark = (props) => {
    const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
    const isEffectRan = useRef(false)

    useEffect(() => {
        if (props.user && !isEffectRan.current){
            props.user.bookmark.map(blogId => 
                GetSingleData('blogs', blogId).then(bookmarkedBlog => {
                    setBookmarkedBlogs(prevBlogs => [...prevBlogs,bookmarkedBlog])
                })
            )
            isEffectRan.current = true
        }
    }, [])


    return (
        <>
            {
                props.user ? (
                    <>
                        {props.user.bookmark.length <= 0 ? (
                            <diV className="my-20">
                                <img
                                    src={sad_face}
                                    alt="Sad Face"
                                    className="m-auto"
                                />
                                <p className="text-center text-4xl mt-8"
                                >Oops...! You don't have any bookmark blog</p>
                            </diV>
                        ) : (
                            <>
                                <Title title="My Bookmark" className="mt-10 justify-center text-lg sm:text-2xl md:text-3xl"
                                    barClass='w-24 sm:w-44'
                                />
                                {(bookmarkedBlogs.length > 0) ? (
                                    <>
                                        <div className={`lg:pt-10 pl-10 hidden sm:max-lg:ml-[3.5%]
                                            ${bookmarkedBlogs.length < 4 ? 'sm:flex justify-around'
                                                : 'sm:grid grid-cols-2 lg:grid-cols-3 xl:max-2xl:gap-x-20 2xl:grid-cols-4'} `}
                                        >
                                            {bookmarkedBlogs.map((blog) => <BlogCard item={blog} isEdit={false}
                                            />)}
                                        </div>
                                        <div className={`lg:pt-10 lg:pl-10 sm:hidden`}>
                                            {bookmarkedBlogs.map((blog) => <BlogSlide item={blog} isEdit={false}
                                            />)}
                                        </div>
                                    </>
                                ) :
                                    <Loading />
                                }
                            </>
                        )
                        }
                    </>
                ) : (
                    <RequiredAuth />
                )
            }
        </>
    )
}

export default Bookmark
