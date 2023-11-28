import {UserAvatar} from './../../components/myPage/ShowUserInfo/UserAvatar'
import {ChangeInfo} from './../../components/myPage/ChangeInfo'

export const MyModifyPage = () => {
    return (
        <div className="flex flex-row m-12">
            <div className="w-1/3">
                <button className="w-16 h-8 mb-8 border-2 rounded-md"> 뒤로 </button>
                <UserAvatar />
                <button className="w-40 h-12 mt-8 ml-8 border-2 rounded-lg">
                    프로필 사진 변경
                </button>
            </div>
            <div className="w-2/3">
                <ChangeInfo text="아이디" />
                <ChangeInfo text="비밀번호" />
                <ChangeInfo text="비밀번호 확인" />
                <ChangeInfo text="이메일" />
                <ChangeInfo text="이름" />
                <ChangeInfo text="전화번호" />
            </div>
        </div>
    )
}
