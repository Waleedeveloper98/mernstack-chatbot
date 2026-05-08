import React, { createContext } from 'react'

export const chatContext = createContext()

const Context = ({children}) => {
  
  return (
    <chatContext.Provider value={{}}>
{children}
    </chatContext.Provider>
  )
}

export default Context