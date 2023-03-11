import React, { useEffect, useState } from 'react'
import Intro from '../components/Intro'
import FeaturedBlog from '../components/FeaturedBlog'
import { GetAllOrderedBlogs } from '../../../api/CRUD_API'
import { useNavigate } from 'react-router'
import BlogPart from '../../../global_component/BlogPart/BlogPart'

const Home = (props) => {
    const [twoHighestViewBlog, setTwoHighestViewBlog] = useState([]);
    const [latestBlogs, setLatestBlogs] = useState([])
    const navigation = useNavigate()

    useEffect(() => {
        GetAllOrderedBlogs('totalView').then((orderByViewBlogs) => {
            setTwoHighestViewBlog(orderByViewBlogs.slice(0, 2))
        })
        GetAllOrderedBlogs('createdAt').then((allBlogs) => {
            setLatestBlogs(allBlogs.slice(0, 3))
        })
    }, [])

    return (
        <div>
            <Intro user={props.user} />
            {twoHighestViewBlog.length > 0 && <>
                {
                    twoHighestViewBlog.map((blog,index) => <FeaturedBlog className={`${index > 0 ? 'flex-row-reverse' : ''}`}
                        item={blog}
                        onClick={() => {
                            navigation(`/blogs/${blog.id}`)
                        }}
                    />)
                }

            </>}
            <BlogPart title='Recent Blogs' data={latestBlogs} />
        </div>
    )
}

export default Home
