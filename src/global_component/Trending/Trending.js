import React from 'react'
import Title from '../Title'
import ImageMedalRank from './sub_components/ImageMedalRank'
import TrendingBlogs from './sub_components/TrendingBlogs'

const Trending = (props) => {

    return (
        <div className={`${props.className} items-center `}>
            <Title title="Favorite" className="max-lg:hidden text-3xl lg:mb-4 lg:ml-4" 
                barClass="w-16 xl:w-32 2xl:w-44"
            />
            <div className="flex">
                <ImageMedalRank />
                <TrendingBlogs/>
            </div>
        </div>
    )
}

export default Trending
