import React, { useState } from 'react'
import { AuthPopupContext, BlogContext, FilterContext } from '../contexts'
const Provider = (props) => {

    const [authPopup, setAuthPopup] = useState({
        open: false,
        authState: 'login'
    })
    const [blogData, setBlogData] = useState({
        coverPhotoSrc: '',
        category: 'creation',
        region:'global'
    })
    const [filterData, setFilterData] = useState({
        unselectAll: false,
        selectedValue: {
            author: [],
            year: [],
            category: [],
            regions: []
        }
    })
    return (
        <AuthPopupContext.Provider value={[authPopup, setAuthPopup]}>
            <BlogContext.Provider value={[blogData, setBlogData]}>
                <FilterContext.Provider value={[filterData, setFilterData]}>
                    {props.children}
                </FilterContext.Provider>
            </BlogContext.Provider>
        </AuthPopupContext.Provider>
    )
}

export default Provider
