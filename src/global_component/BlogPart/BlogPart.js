import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/bundle'
import BlogCard from '../BlogCard'
import Loading from '../Loading'
import Title from '../Title'
import BlogSlide from '../BlogSlide';
import { Autoplay, Pagination } from 'swiper';
import './slider-style.css'

const BlogPart = (props) => {
    return (
        <div className="bg-light-silver">
            <Title title={props.title} className="my-4 capitalize text-2xl justify-center
                sm:my-8
                md:text-4xl
                max-[414px]:text-xl
            "
                barClass='w-24 sm:w-44'
            />
            {
                props.data.length > 0 ? (
                    <>
                        <div className="hidden sm:flex flex-row justify-evenly items-center">
                            {props.data.map((blog) => <BlogCard item={blog} isEdit={false}
                            />)}
                        </div>
                        <Swiper className='sm:hidden h-48'
                            loop={true}
                            modules={[Pagination, Autoplay]}
                            pagination={true}
                            autoplay={{
                                delay: 3000,
                            }}
                        >
                            {
                                props.data.map((blog) => {

                                    return (
                                        <SwiperSlide>
                                            <BlogSlide item={blog} />
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </>
                ) : <Loading />
            }
        </div>
    )
}

export default BlogPart
