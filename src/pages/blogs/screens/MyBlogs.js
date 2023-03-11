import React, { useEffect, useState } from 'react'
import BlogCard from '../../../global_component/BlogCard'
import sad_face from '../../../assets/images/error_image/sad_face.png'
import Loading from '../../../global_component/Loading';
import { GetAllOrderedBlogs } from '../../../api/CRUD_API';
import RequiredAuth from '../../requiredAuth/screens/RequiredAuth';
import Title from '../../../global_component/Title';
import BlogSlide from '../../../global_component/BlogSlide';

const MyBlogs = (props) => {
    const [currentUserBlogs, setCurrentUserBlogs] = useState([]);
    useEffect(() => {
        GetAllOrderedBlogs('createdAt').then((allBlogs) => setCurrentUserBlogs(allBlogs.filter(blog => blog.author.uid === props.user.uid)))
    }, [])

    return (
        <>
            {
                props.user ? (
                    <>
                        {props.user.blogs.length <= 0 ? (
                            <diV className="my-20">
                                <img
                                    src={sad_face}
                                    alt="Sad Face"
                                    className="m-auto"
                                />
                                <p className="text-center text-4xl mt-8"
                                >Oops...! You don't have any myth story</p>
                            </diV>
                        ) : (
                            <>
                                <Title title="My Blogs" className="mt-10 justify-center text-xl sm:text-3xl md:text-4xl"
                                    barClass='w-24 sm:w-44'
                                />
                                {(currentUserBlogs.length > 0) ? (
                                    <>
                                        <div className={`lg:pt-10 lg:pl-10 hidden
                                        ${currentUserBlogs.length < 4 ? 'sm:flex justify-around' 
                                            : 'sm:grid grid-cols-2 lg:grid-cols-3 gap-4'} `}>
                                            {currentUserBlogs.map((blog) => <BlogCard item={blog} isEdit={true}
                                            />)}
                                        </div>
                                        <div className={`lg:pt-10 lg:pl-10 sm:hidden`}>
                                            {currentUserBlogs.map((blog) => <BlogSlide item={blog} isEdit={true}
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

export default MyBlogs
