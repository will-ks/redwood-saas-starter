import { FC } from 'react';
import { MetaTags } from '@redwoodjs/web'

const ProfilePage: FC = () => {
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <h1>ProfilePage</h1>
      <p>
        Find me in <code>./web/src/pages/ProfilePage/ProfilePage.tsx</code>.
      </p>
    </>
  )
}

export default ProfilePage
