import { createContext, FC, useEffect, useState } from 'react'
import uuid from '../../utils/uuid'

const initialState = { id: '' }
const FormControlContext = createContext(initialState)

interface IStaticComponents {
  Context: typeof FormControlContext
}

const FormControl: FC & IStaticComponents = ({ children }) => {
  const [id, setId] = useState('')
  // set id and name on render
  useEffect(() => setId(uuid()), [])
  return (
    <FormControlContext.Provider value={{ id }}>
      {children}
    </FormControlContext.Provider>
  )
}

FormControl.Context = FormControlContext

export { FormControl }
