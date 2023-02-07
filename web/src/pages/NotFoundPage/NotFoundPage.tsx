import { FC } from 'react'
import FatalErrorDisplay, {
  FatalErrorType,
} from 'src/components/FatalErrorDisplay/FatalErrorDisplay'

const NotFoundPage: FC = () => {
  return <FatalErrorDisplay type={FatalErrorType.NotFound} />
}

export default NotFoundPage
