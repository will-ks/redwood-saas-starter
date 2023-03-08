import { FC } from 'react';
import { MetaTags } from '@redwoodjs/web'

const HomePage: FC = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>.
      </p>
    </>
  )
}

export default HomePage
