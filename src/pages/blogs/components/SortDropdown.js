import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const SortDropdown = (props) => {

    const [selectedValue, setSelectedValue] = useState('Newest')
    const [isDropdownOpen, setDropdownOpen] = useState(false)

    function Compare(a, b, field) {
        switch (field) {
            case 'Highest View':
                return b.totalView - a.totalView
            case 'Oldest':
                return a.createdAt - b.createdAt
            case 'Newest':
                return b.createdAt - a.createdAt
            default:
                break;
        }
    }

    const HandleClick = (e) => {
        setSelectedValue(e.target.innerText)
        setDropdownOpen(!isDropdownOpen)
        props.handleSort(props.data.sort((a, b) => Compare(a, b, e.target.innerText)))
    }


    return (
        <div className={`flex flex-col h-12 relative`}
        >
            <div className={`flex justify-between bg-dark-silver mt-2 w-48 px-4 cursor-pointer h-12
                
                ${isDropdownOpen ? 'rounded-none rounded-t-xl border-b border-dark-grey border-solid' : 'rounded-xl'}`}
                onClick={() => {
                setDropdownOpen(!isDropdownOpen)
            }}
            >
                <p className="text-xl sm:text-2xl text-dark-grey my-2">{selectedValue}</p>
                {
                    isDropdownOpen
                        ? <FontAwesomeIcon icon={faSortUp} size="2x" className="text-teal block mt-3" />
                        : <FontAwesomeIcon icon={faSortDown} size="2x" className="text-teal block" />
                }
            </div>
            {
                isDropdownOpen && <div className="flex flex-col divide-y divide-dark-grey
                    bg-dark-silver z-10 w-48 relative rounded-b-xl">
                    <p className="text-xl sm:text-2xl text-dark-grey cursor-pointer py-2 hover:bg-teal hover:text-white px-4"
                        onClick={HandleClick}
                    >
                        Newest</p>
                    <p className="text-xl sm:text-2xl text-dark-grey cursor-pointer py-2 hover:bg-teal hover:text-white px-4"
                        onClick={HandleClick}
                    >
                        Highest View</p>
                    <p className="text-xl sm:text-2xl text-dark-grey py-2 cursor-pointer hover:bg-teal hover:text-white hover:rounded-b-xl px-4"
                        onClick={HandleClick}
                    >
                        Oldest</p>
                </div>
            }
        </div>
    )
}

export default SortDropdown
