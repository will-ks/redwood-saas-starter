import { FC } from 'react'
import FatalErrorDisplay, {
  FatalErrorType,
} from 'src/components/FatalErrorDisplay/FatalErrorDisplay'
import IsolatedLayout from 'src/layouts/IsolatedLayout/IsolatedLayout'

const NotFoundPage: FC = () => {
  return (
    <IsolatedLayout>
      <FatalErrorDisplay type={FatalErrorType.NotFound} />
    </IsolatedLayout>
  )
}

export default NotFoundPage
