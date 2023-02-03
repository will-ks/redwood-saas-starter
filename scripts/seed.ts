import { db } from 'api/src/lib/db'

export default async () => {
  try {
    await Promise.all([
      db.user.create({
        data: {
          id: 'test_user',
        },
      }),
    ])
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
