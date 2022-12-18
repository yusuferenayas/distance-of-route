import { Slide, toast, ToastOptions } from 'react-toastify'

const toastOption: ToastOptions = {
  position: 'top-center',
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  transition: Slide,
  theme: 'light',
  autoClose: 30 * 1000,
}

export const notifySuccess = (msg: string, options?: ToastOptions) => {
  toast.success(msg, { ...toastOption, ...options })
}

export const notifyError = (msg: string, options?: ToastOptions) => {
  toast.error(msg, { ...toastOption, ...options })
}
