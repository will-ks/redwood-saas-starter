import { ReactNode } from 'react'
import { MOCK_DATA } from 'src/data/mock-data'

export const getArgsWithMockDefaults = <F, T extends Partial<F>>(args: T) => ({
  ...MOCK_DATA,
  ...args,
})

export const getPropsMocker =
  <F, T extends Partial<F>>(defaultArgs: T) =>
  <A, B extends Partial<A>>(args?: B) =>
    getArgsWithMockDefaults({ ...defaultArgs, ...args }) as T &
      typeof MOCK_DATA & { children?: ReactNode }
