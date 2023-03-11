import { useContext } from 'react'
import {BlogContext} from '../contexts'

export const useBlog = () => useContext(BlogContext)