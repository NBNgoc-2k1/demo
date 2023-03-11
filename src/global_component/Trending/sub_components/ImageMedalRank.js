import React from 'react'
import gold_medal from '../../../assets/images/blogs_image/first.png'
import silver_medal from '../../../assets/images/blogs_image/second.png'
import bronze_medal from '../../../assets/images/blogs_image/medal.png'

const ImageMedalRank = () => {
    return (
        <div className="flex flex-col justify-around">
            <img src={gold_medal}
                alt="gold_medal"
                className="w-20"
            />
            <img src={silver_medal}
                className="w-20"
                alt="silver_medal"

            /><img src={bronze_medal}
                className="w-20"
                alt="bronze_medal"

            />
        </div>
    )
}

export default ImageMedalRank
