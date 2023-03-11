import React, { useState,useEffect } from 'react'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Outlet, useLocation } from 'react-router'
import Header from './global_component/Header'
import Footer from './global_component/Footer'
import IconButton from './global_component/IconButton'
import {useBlog} from './hooks'
import BottomNavigation from './global_component/BottomNav';
const Root = (props) => {
    const location = useLocation()
    const [visible, setVisible] = useState(false)
    const [blogData, setBlogData] = useBlog()

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 150) {
            setVisible(true)
        }
        else if (scrolled <= 150) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    useEffect(() => {
        if (location.pathname !== '/add')
        {
            setBlogData((previousState) => {
                return {
                    ...previousState, coverPhotoSrc: ''
                }
            })
        }
    },[location.pathname])

    return (
        <div className="bg-light-silver">
            <Header user={props.user}/>
            <div id="detail">
                <Outlet />
            </div>
            <IconButton icon={faArrowUp}
                className={`fixed ${visible ? 'inline' : 'hidden'} right-8 bottom-[12vh] sm:bottom-[10vh] md:bottom-[6vh] bg-teal w-14 h-14 `}
                onClick={scrollToTop}
                iconClass="text-white my-3 mx-4 text-3xl"
            />
            <BottomNavigation user={props.user}/>
            <Footer />
            <div className='h-[9.5vh] sm:h-[7vh] md:hidden lg:h-0'></div>
        </div>
    )
}

export default Root
