import { useContext } from 'react'
import {FilterContext} from '../contexts'

export const useFilter = () => useContext(FilterContext)