import {
  openConfirmModal as mantineOpenConfirmModal,
  openModal as mantineOpenModal,
} from '@mantine/modals'
import { ModalSettings } from '@mantine/modals/lib/context'

export const openConfirmModal = mantineOpenConfirmModal

export const openModal = (options: ModalSettings) =>
  mantineOpenModal({
    exitTransitionDuration: 100,
    size: 'sm',
    ...options,
  })
