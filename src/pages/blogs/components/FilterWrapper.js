import React from 'react'
import FilterValue from './FilterValue'

const FilterWrapper = (props) => {
    return (
        <div className="mb-6">
            <p className="text-lg font-semibold">{props.attributeName}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {
                    props.values.map((value) => <FilterValue value={value} attributeName={props.attributeName}/>)
                }           
            </div>
        </div>
    )
}

export default FilterWrapper
