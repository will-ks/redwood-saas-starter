import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import ownerOrSuperuserOnly from './ownerOrSuperuserOnly'

describe('ownerOrSuperuserOnly directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(ownerOrSuperuserOnly.schema).toBeTruthy()
    expect(getDirectiveName(ownerOrSuperuserOnly.schema)).toBe(
      'ownerOrSuperuserOnly'
    )
  })

  it('has a ownerOrSuperuserOnly throws an error if validation does not pass', () => {
    const mockExecution = mockRedwoodDirective(ownerOrSuperuserOnly, {})

    expect(mockExecution).toThrowError(
      'Implementation missing for ownerOrSuperuserOnly'
    )
  })
})
