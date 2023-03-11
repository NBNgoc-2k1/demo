import React, { useState } from 'react'
import { useFilter } from '../../../hooks'

const FilterValue = (props) => {
    const [filterData, setFilterData] = useFilter()
    const propertyName = props.attributeName.toLowerCase()
    const [isSelected, setSelected] = useState(
        filterData.selectedValue[propertyName].includes(props.value)
    )
    return (
        <div className={`rounded-full border-2 p-1 border-solid border-brown
            hover:bg-brown hover:text-white cursor-pointer text-lg
            ${(isSelected === true && filterData.unselectAll === false) ? 'bg-brown text-white' : 'bg-white text-dark-grey'}
        `}
            onClick={() => {
                if (!isSelected)
                    filterData.selectedValue[propertyName].push(props.value)
                else filterData.selectedValue[propertyName] = filterData.selectedValue[propertyName].filter(item => item !== props.value)
                setSelected(!isSelected)
            }}
        >
            <p className="text-center capitalize">{props.value}</p>
        </div>
    )
}

export default FilterValue
