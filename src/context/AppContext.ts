import React from 'react'
import { AppContextInterface } from '../interfaces'

const AppContext: React.Context<AppContextInterface> = React.createContext({} as AppContextInterface)

export default AppContext