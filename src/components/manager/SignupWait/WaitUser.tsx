import React, {FC} from 'react'
import {Button, UserInfo} from '../../index'
import {postBusinessCheck} from '../../../api/Business/BusinessCheck'

// 유저 정보 한줄 - 추후 UserInfo로 prop 추가해줘야함

type WaitUserProps = {}

export const WaitUser: FC<WaitUserProps> = ({}) => {
  //사업자 확인 - 조회 버튼 누를시 사업자 번호 넘겨서 확인
  async function onCheck(b_no: string[]) {
    try {
      const data = await postBusinessCheck(b_no)
      if (data.data[0].b_stt == '' || data.data[0].b_stt == '폐업자') {
        alert('사업자 아님')
      } else if (data.data[0].b_stt == '계속사업자') {
        alert('사업자 확인 완료')
      } else if (data.data[0].b_stt == '휴업자') {
        alert('현재 휴업자')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex items-center w-full border-b-2">
      <div className="w-3/4 p-3 m-5 rounded-lg">
        <div className="flex justify-between w-full ">
          <UserInfo text="이름" />
          <UserInfo text="아이디" />
          <UserInfo text="이메일" />
          <UserInfo text="전화번호" />
          <UserInfo text="0000" />
        </div>
      </div>
      <div className="flex justify-around p-3 m-5 min-w-fit">
        <Button
          text="조회"
          bgColor="btn-warning"
          onClick={() => onCheck(['0000000000'])}
        />
        <Button text="승인" bgColor="btn-primary" />
        <Button text="삭제" bgColor="btn-error" />
      </div>
    </div>
  )
}
