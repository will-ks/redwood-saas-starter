import { createContext, FC, useContext, useState } from 'react'

/**
 * Create wrapper component with a context state
 *
 * @param initialState - The initial state
 * @returns A tuple of [the state hook, the component]
 * @example
 * ```
 * const [stateHook, Component] = getStatefulWrapper({
 *   someKey: 'someValue',
 * })
 *
 * export const useMyState = stateHook
 *
 * return <Component>
 *   ... children
 * </Component>
 */
export const getStatefulWrapper = <T,>(
  initialState: T
): [() => [state: T, setState: (state: T) => void], FC] => {
  const StatefulWrapperContext = createContext<
    [state: T, setState: (state: T) => void] | null
  >(null)

  const useStatefulWrapperState = () => {
    const currentUserContext = useContext(StatefulWrapperContext)

    if (!currentUserContext) {
      throw new Error(
        'useStatefulWrapperState has to be used within <StatefulWrapperContext.Provider>'
      )
    }

    return currentUserContext
  }

  const StatefulWrapper: FC = ({ children }) => {
    const contextValue = useState<T>(initialState)
    return (
      <StatefulWrapperContext.Provider value={contextValue}>
        {children}
      </StatefulWrapperContext.Provider>
    )
  }

  return [useStatefulWrapperState, StatefulWrapper]
}
