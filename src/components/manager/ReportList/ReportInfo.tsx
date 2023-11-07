import React, {useState} from 'react'
import UserInfo from '../UserInfo'
import ReportModal from './ReportModal'

//신고 정보

type ReportInfoProps = {}

const ReportInfo: React.FC<ReportInfoProps> = ({}) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)
  return (
    <div>
      <div className="p-3 m-5 border rounded-lg cursor-pointer" onClick={openModal}>
        <div className="flex justify-between w-full ">
          <UserInfo text="날짜" />
          <UserInfo text="게시글 번호" />
          <UserInfo text="아이디" />
          <UserInfo text="신고유저" />
        </div>
      </div>
      <ReportModal isOpen={isModalOpen} onClose={closeModal}>
        <h1 className="text-lg font-bold">신고</h1>
        <p className="mt-4">날짜 : {'날짜'}</p>
        <p className="mt-4">게시글 번호 : {'게시글번호'}</p>
        <p className="mt-4">아이디 : {'아이디'}</p>
        <p className="mt-4">신고 유저 : {'신고유저'}</p>
        <p className="mt-4 break-all">
          신고 사유 :<br /> -{'신고사유'}
        </p>
        <div className="flex justify-around mt-5">
          <button
            className="w-1/4 p-2 mt-4 text-white rounded btn-primary btn"
            onClick={closeModal}>
            게시글로
            <br />
            이동
          </button>
          <button
            className="w-1/4 p-2 mt-4 text-white rounded btn-error btn"
            onClick={closeModal}>
            제재
          </button>
          <button
            className="w-1/4 p-2 mt-4 text-white rounded btn-neutral btn"
            onClick={closeModal}>
            닫기
          </button>
        </div>
      </ReportModal>
    </div>
  )
}

export default ReportInfo
