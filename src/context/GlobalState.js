import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

//initial state
const initialState = {
    isAdmin:false
}

//Create context
export const GlobalContext = createContext(initialState)

//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    //Actions
    function authAdmin(statu) {
        dispatch({
            type: 'AUTH_ADMIN',
            payload: statu
        })
    }

    return (
        <GlobalContext.Provider value={{ isAdmin: state.isAdmin, authAdmin }} >
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider;