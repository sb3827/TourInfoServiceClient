import React, {FC} from 'react'
import {Button, UserInfo} from '../../index'
import {UserData} from '../../../data/manager/index'

type FindUserInfoProps = {
    users: UserData
}

export const FindUserInfo: FC<FindUserInfoProps> = ({users}) => {
    return (
        <div className="flex items-center w-full border-b-2 min-w-fit">
            <div className="w-3/4 p-3 ">
                <div className="flex w-full min-w-fit">
                    <UserInfo text={users.userName} />
                    <UserInfo text={users.userId} />
                    <UserInfo text={users.userEmail} />
                    <UserInfo text={users.phoneNum} />
                    <UserInfo text={users.regDate.toDateString()} />
                    <UserInfo
                        text={users.businessCheck === true ? '사업자' : '일반 회원'}
                    />
                </div>
            </div>
            <div className="flex justify-end w-1/4 p-3 min-w-fit">
                <Button
                    value="탈퇴"
                    className="bg-white text-red-700 hover:text-white border border-red-700 hover:bg-red-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 "
                />
            </div>
        </div>
    )
}
