import { createContext, FC, useContext, useState } from 'react'

export const getMultiPageFormLayout = <T,>(initialState: T) => {
  type MultiPageFormContextType = [
    formState: T,
    setFormState: (state: T) => void
  ]

  const MultiPageFormContext = createContext<MultiPageFormContextType | null>(
    null
  )

  const useMultiPageForm = () => {
    const currentUserContext = useContext(MultiPageFormContext)

    if (!currentUserContext) {
      throw new Error(
        'useMultiPageForm has to be used within <MultiPageFormContext.Provider>'
      )
    }

    return currentUserContext
  }

  const MultiPageFormLayout: FC = ({ children }) => {
    const contextValue = useState<T>(initialState)
    return (
      <MultiPageFormContext.Provider value={contextValue}>
        {children}
      </MultiPageFormContext.Provider>
    )
  }

  return [useMultiPageForm, MultiPageFormLayout]
}
