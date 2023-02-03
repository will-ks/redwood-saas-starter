import assert from 'assert'
import { typeFlag } from 'type-flag'

export default async () => {
  const {
    flags: { example },
  } = typeFlag({
    example: String,
  })
  assert(example)
}
