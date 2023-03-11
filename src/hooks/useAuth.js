import { useContext } from 'react'
import {AuthPopupContext} from '../contexts'

export const useAuth = () => useContext(AuthPopupContext)