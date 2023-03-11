import { faFacebookSquare, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from './IconButton'


const Footer = () => {
    return (
        <div className="flex flex-row bg-dark-grey items-center justify-around
            max-[414px]:flex-col
        ">
            <div className='max-[414px]:flex hidden w-full items-end justify-between my-4 '>
                <div className="flex flex-col">
                    <p className="text-footer"
                    >Myth World</p>
                    <div className="flex justify-start md:justify-between">
                        <IconButton icon={faFacebookSquare}
                            className='ml-3 md:m-0'
                            iconClass="text-white
                            text-3xl
                            xl:text-4xl
                        " />
                        <IconButton icon={faInstagram}
                            className='ml-3 md:m-0'

                            iconClass="text-white
                            text-3xl
                            xl:text-4xl
                        " />
                        <IconButton icon={faYoutube}
                            className='ml-3 md:m-0'

                            iconClass="text-white
                            text-3xl
                            xl:text-4xl
                        " />
                    </div>
                    <p className="max-[414px]:hidden block md:hidden text-footer md:mt-36">
                        Copyright <FontAwesomeIcon icon={faCopyright} /> 2022
                        <p className='text-footer max-md:hidden '> All rights reserved</p>
                    </p>
                </div>
                <div className="flex flex-col items-start justify-around md:my-10">
                    <Link to='/aboutus'
                        className="text-footer
                hover:underline underline-offset-4 decoration-2">
                        About us
                    </Link>
                    <Link to='/help'
                        className="text-footer
                hover:underline underline-offset-4 decoration-2">
                        Help
                    </Link>
                    <Link to='/privacy'
                        className="text-footer mb-0
                hover:underline underline-offset-4 decoration-2">
                        Term and Privacy
                    </Link>
                </div>
            </div>
            <div className="max-[414px]:hidden flex flex-col">
                <p className="text-footer"
                >Myth World</p>
                <div className="flex justify-start md:justify-between">
                    <IconButton icon={faFacebookSquare}
                        className='ml-3 md:m-0'
                        iconClass="text-white
                            text-3xl
                            xl:text-4xl
                        " />
                    <IconButton icon={faInstagram}
                        className='ml-3 md:m-0'

                        iconClass="text-white
                            text-3xl
                            xl:text-4xl
                        " />
                    <IconButton icon={faYoutube}
                        className='ml-3 md:m-0'

                        iconClass="text-white
                            text-3xl
                            xl:text-4xl
                        " />
                </div>
                <p className="block md:hidden text-footer md:mt-36">
                    Copyright <FontAwesomeIcon icon={faCopyright} /> 2022
                    <p className='text-footer max-md:hidden '> All rights reserved</p>
                </p>
            </div>
            <div className="max-[414px]:hidden flex flex-col items-start justify-around md:my-10">
                <Link className="text-footer
                hover:underline underline-offset-4 decoration-2" to='/aboutus'>
                    About us
                </Link>
                <Link className="text-footer
                hover:underline underline-offset-4 decoration-2">
                    Help
                </Link>
                <Link className="text-footer
                hover:underline underline-offset-4 decoration-2">
                    Term and Privacy
                </Link>
            </div>
            <p className="max-[414px]:block hidden md:block text-footer md:mt-36 text-center">
                Copyright <FontAwesomeIcon icon={faCopyright} /> 2022 All rights reserved
            </p>
        </div>
    )
}

export default Footer
