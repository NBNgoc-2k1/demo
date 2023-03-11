import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useBlog } from '../../hooks'

const SortDropdown = (props) => {

    const [selectedValue, setSelectedValue] = useState(props.defaultValue)
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [blogData, setBlogData] = useBlog()

    const HandleClick = (e) => {
        setSelectedValue(e.target.innerText)
        setDropdownOpen(!isDropdownOpen)
        setBlogData((previousState) => {
            return {
                ...previousState, [props.label.toLowerCase()]:e.target.innerText.toLowerCase()
            }
        })
    }


    return (
        <div className={`flex flex-col h-12 ${props.className}`}
        >
            <label className={`text-sm relative 
                w-[4.5rem] top-2 left-2 
                ${!isDropdownOpen ? 'text-brown' : 'text-dark-grey'}
                text-center z-10 block bg-light-silver`}>{props.label}</label>
            <div className={`flex justify-between bg-transparent px-4 cursor-pointer h-12
                rounded-xl border-2 border-solid 
                ${isDropdownOpen ? 'border-dark-silver' : 'border-teal'}`}
                onClick={() => {
                    setDropdownOpen(!isDropdownOpen)
                }}
            >
                <p className="text-2xl my-2 capitalize">{selectedValue}</p>
                {
                    isDropdownOpen
                        ? <FontAwesomeIcon icon={faSortUp} size="2x" className="text-teal lg:block mt-3" />
                        : <FontAwesomeIcon icon={faSortDown} size="2x" className="text-teal lg:block" />
                }
            </div>
            <div className={`${isDropdownOpen ? 'flex' : 'hidden'} w-full h-screen absolute inset-0`}
                onClick={() => setDropdownOpen(false)}
            ></div>
            <div className={`${isDropdownOpen ? 'flex' : 'hidden'} flex-col divide-y divide-brown border-2 border-solid border-teal
                    bg-light-silver z-10 rounded-lg`}>
                {
                    props.dataSet.map(data =>
                        <p className="text-2xl cursor-pointer py-2 capitalize hover:bg-teal hover:text-white px-4"
                            onClick={HandleClick}
                        >{data}</p>
                    )
                }
            </div>
        </div>
    )
}

export default SortDropdown
