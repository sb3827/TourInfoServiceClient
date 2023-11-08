import React, {FC} from 'react'

type ReportModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const ReportModal: FC<React.PropsWithChildren<ReportModalProps>> = ({
  isOpen,
  onClose,
  children
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex overflow-auto bg-gray-600 bg-opacity-50 ">
      <div className="relative flex flex-col w-full max-w-2xl p-8 m-auto bg-white rounded-xl ">
        <span className="absolute top-0 right-0 p-4" onClick={onClose}>
          <button>X</button>
        </span>
        {children}
      </div>
    </div>
  )
}
