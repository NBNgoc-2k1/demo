import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { GetAllOrderedBlogs } from '../../../api/CRUD_API'
import AppButton from '../../../global_component/AppButton'
import BlogCard from '../../../global_component/BlogCard'
import IconButton from '../../../global_component/IconButton'
import Loading from '../../../global_component/Loading'
import Trending from '../../../global_component/Trending/Trending'
import FilterWrapper from '../components/FilterWrapper'
import SortDropdown from '../components/SortDropdown'
import { useFilter } from '../../../hooks'
import sad_face from '../../../assets/images/error_image/sad_face.png'
import BlogSlide from '../../../global_component/BlogSlide';

const Blogs = () => {
    const [allBlogs, setAllBlogs] = useState([])
    const [filteredBlogs, setFilteredBlog] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const [filterData, setFilterData] = useFilter()
    const [filterValueSet, setFilterValueSet] = useState()
    const [pageState, setPageState] = useState('blogs')

    const CheckBlogHasFilterValue = (blog) => {
        const authorList = filterData.selectedValue.author
        const yearList = filterData.selectedValue.year
        const categoryList = filterData.selectedValue.category
        const regionsList = filterData.selectedValue.regions

        const date = new Date(blog.createdAt.seconds * 1000);
        const year = date.getFullYear()

        const hasAuthor = authorList.length > 0 ? authorList.includes(blog.author.name) : true
        const hasYear = yearList.length > 0 ? yearList.includes(year) : true
        const hasCategory = categoryList.length > 0 ? categoryList.includes(blog.category) : true
        const hasRegion = regionsList.length > 0 ? regionsList.includes(blog.region) : true

        return hasAuthor && hasYear && hasCategory && hasRegion
    }

    const FilterBlogs = (blogs) => {
        const filteredBlogs = []
        blogs.map(blog => {
            CheckBlogHasFilterValue(blog) && filteredBlogs.push(blog)
        })

        setFilteredBlog(filteredBlogs)
    }

    const GetBlogYear = (seconds) => {
        const date = new Date(seconds * 1000);
        return date.getFullYear()
    }

    const RemoveDuplicateItem = (array) => {
        return [...new Set(array)]
    }

    useEffect(() => {
        GetAllOrderedBlogs('createdAt').then((allBlogs) => {
            setAllBlogs(allBlogs)
            setFilteredBlog(allBlogs)
            const values = {
                author: [],
                year: [],
                category: [],
                regions: []
            }
            allBlogs.map((blog) => {
                values.author.push(blog.author.name)
                values.category.push(blog.category)
                values.regions.push(blog.region)
                values.year.push(GetBlogYear(blog.createdAt.seconds))
            })
            setFilterValueSet(values)
        })
    }, [])

    function SortBlogs(sortedBlogs) {
        setFilteredBlog(sortedBlogs)
    }

    const toggleFilter = () => {
        setShowFilter(!showFilter)
    }

    const ResetFilter = () => {
        setFilterData((previousState) => {
            return {
                ...previousState,
                unselectAll: !previousState.unselectAll,
                selectedValue: {
                    author: [],
                    year: [],
                    category: [],
                    regions: []
                }
            }
        })
    }

    const ChangePageState = (newState) => {
        setPageState(newState)
    }

    return (
        <div>
            <div className='mt-8 sm:mx-8 flex justify-center text-3xl lg:hidden'>
                <div className={`rounded-full px-6 w-1/3 sm:w-1/2 cursor-pointer ${pageState === 'blogs' ? 'bg-teal' : ''}`}
                    onClick={() => ChangePageState('blogs')}
                >
                    <p className={`text-center py-3 
                    ${pageState === 'blogs' ? 'text-white' : 'text-dark-grey'}`}>Blogs</p>
                </div>
                <div className={`rounded-full px-6 sm:w-1/2 cursor-pointer ${pageState === 'favourite' ? 'bg-teal' : ''}`}
                    onClick={() => ChangePageState('favourite')}
                >
                    <p className={`text-center py-3 
                    ${pageState === 'favourite' ? 'text-white' : 'text-dark-grey'}`}>Favourite</p>
                </div>
            </div>
            <div className="flex mt-6">
                <div className={`w-full h-full lg:w-7/12 ${pageState === 'blogs' ? 'block' : 'max-lg:hidden'}`}>
                    <div className="flex justify-between mx-4 sm:mx-8">
                        <IconButton icon={faFilter} className="my-4 text-teal relative" iconClass="text-3xl"
                            onClick={toggleFilter}
                        />
                        <SortDropdown handleSort={SortBlogs} data={[...allBlogs]} />
                    </div>
                    <Dialog open={showFilter} onClose={toggleFilter}>
                        <DialogContent>
                            {filterValueSet && <>
                                <FilterWrapper attributeName="Author" values={RemoveDuplicateItem(filterValueSet.author)} />
                                <FilterWrapper attributeName="Year" values={RemoveDuplicateItem(filterValueSet.year)} />
                                <FilterWrapper attributeName="Category" values={RemoveDuplicateItem(filterValueSet.category)} />
                                <FilterWrapper attributeName="Regions" values={RemoveDuplicateItem(filterValueSet.regions)} />
                            </>
                            }
                        </DialogContent>
                        <DialogActions>
                            <AppButton content="restart" className="bg-dark-grey" onClick={() => {
                                ResetFilter()
                                toggleFilter()
                                ResetFilter()
                                setFilteredBlog(allBlogs)
                            }} />
                            <AppButton content="finish" className="" onClick={() => {
                                FilterBlogs(allBlogs)
                                toggleFilter()
                            }} />
                        </DialogActions>
                    </Dialog>
                    {
                        allBlogs.length > 0 ? (
                            <>
                                {filteredBlogs.length > 0 ? <>
                                    <div className="hidden sm:grid grid-cols-2 2xl:grid-cols-3 sm:gap-x-32 md:gap-x-36 lg:gap-10">
                                        {filteredBlogs.map((blog) => <BlogCard
                                            item={blog}
                                            isEdit={false}
                                        />)}
                                    </div>
                                    <div className='block sm:hidden'>
                                        {filteredBlogs.map((blog) => <BlogSlide
                                            item={blog}
                                            isEdit={false}
                                        />)}
                                    </div>
                                </> : <div className='my-16'>
                                    <img
                                        src={sad_face}
                                        alt="Sad Face"
                                        className="m-auto"
                                    />
                                    <p className="text-center text-4xl mt-8"
                                    >Oops...! We don't have any myth story now</p>
                                </div>}
                            </>
                        ) : <Loading />
                    }
                </div>
                <Trending className={`${pageState === 'favourite' ? 'flex flex-col' : 'max-lg:hidden mt-20 pl-16'} w-full lg:w-5/12 `} />
            </div>
        </div>
    )
}

export default Blogs
