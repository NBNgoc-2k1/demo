import React, { useEffect, useState } from 'react'
import { GetAllOrderedBlogs } from '../../../api/CRUD_API'
import BlogSummary from './BlogSummary'
import PropTypes from 'prop-types'

const TrendingBlogs = (props) => {
    const [trendingBlog, setTrendingBlog] = useState([])

    useEffect(() => {
        GetAllOrderedBlogs('like').then((orderByViewBlogs) => {
            setTrendingBlog(orderByViewBlogs.slice(0, 3))
        })
    }, [props.currentBlogId])

    return (
        <div className="flex flex-col justify-evenly">
            {
                trendingBlog.map((blog,index) => <BlogSummary
                    item={blog}
                />)
            }
        </div>
    )
}

export default TrendingBlogs
