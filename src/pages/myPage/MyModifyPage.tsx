import {user} from './../../data/User/User'
import {useState, useEffect, useRef, ChangeEvent} from 'react'
import {ShowUserInfo, onChangeUserData, deleteId} from './../../api/MyPage/ShowUserInfo'
import {Button} from './../../components/Button'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {Input} from './../../components/index'
import {useNavigate} from 'react-router-dom'

//TODO 수정하기 버튼 클릭 시 다시 마이페이지로 이동, margin/padding 조정, 이미지 업로드 수정

export const MyModifyPage = () => {
    const [user, setUser] = useState<user | null>(null)
    const [userName, setUserName] = useState<string>(user ? user.name : '')
    const [userPhone, setUserPhone] = useState<string>(user ? user.phone : '')
    const [profileImage, setProfileImage] = useState<string>(user ? user.image : '')
    const [file, setFile] = useState<File | null>(null)
    const fileInput = useRef<HTMLInputElement | null>(null)

    const userMno = useSelector((state: RootState) => state.login.mno) || 0

    const navigate = useNavigate()

    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }

    const onChangeUserPhone = (e: ChangeEvent<HTMLInputElement>) => {
        setUserPhone(e.target.value)
    }

    const onChangeUserImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const reader = new FileReader()
            setFile(e.target.files[0])

            reader.onload = () => {
                if (reader.readyState === 2) {
                    const result = reader.result

                    if (typeof result === 'string') {
                        setProfileImage(result)
                    } else {
                        console.error('Unexpected result type:', typeof result)
                    }
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    // //정보 수정
    async function onUserUpdate() {
        const data = {
            mno: user!.mno,
            name: userName,
            email: user!.email,
            phone: userPhone
        }
        try {
            await onChangeUserData(data, file)
            alert('회원정보를 수정하였습니다.')
            navigate(`/mypage/${userMno}`)
        } catch (err) {
            console.log(err)
            alert('회원정보 수정 실패')
        }
    }

    const fetchData = async () => {
        try {
            const userData = await ShowUserInfo(userMno)
            setUser(userData)
            setProfileImage(userData.image)
            setUserName(userData.name)
            setUserPhone(userData.phone)
        } catch (error) {
            console.error('error', error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    // 회원탈퇴
    const WithdrawalId = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (window.confirm('탈퇴하시겠습니까?')) {
            try {
                await deleteId(userMno)
                alert('그동안 이용해주셔서 감사합니다.')
                navigate(`/`)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="flex items-center justify-center h-full ">
            <div className="flex flex-row w-2/3 m-12">
                <div className="flex flex-col items-center justify-center w-1/3">
                    <input
                        type="file"
                        className="hidden"
                        id="file"
                        name="file"
                        accept="image/*"
                        onChange={onChangeUserImage}
                        ref={fileInput}
                    />
                    <img
                        src={profileImage}
                        alt="프로필사진"
                        className="rounded-full cursor-pointer w-60"
                        onClick={() => {
                            if (fileInput.current) {
                                fileInput.current.click()
                            }
                        }}
                    />
                </div>
                <div className="items-center w-2/3">
                    <div className="p-4">
                        <span className="mr-8">이름</span>
                        <Input
                            className="w-64 bg-white"
                            onChange={onChangeUserName}
                            value={userName}
                        />
                    </div>
                    <div className="p-4">
                        <span className="mr-4">이메일</span>
                        <input
                            type="text"
                            value={user && user.email ? user.email : ''}
                            className="w-64 h-12 p-4 text-white rounded-md bg-gray-950"
                            disabled
                        />
                    </div>
                    <div className="p-4">
                        <span className="mr-4">전화번호</span>
                        <Input
                            className="w-64 bg-white"
                            value={userPhone}
                            onChange={onChangeUserPhone}
                        />
                    </div>
                    <div className="p-4">
                        <span className="mr-4">생년월일</span>
                        <input
                            type="text"
                            value={user && user.birth ? user.birth : ''}
                            className="w-64 h-12 p-4 text-white rounded-md bg-gray-950"
                            disabled
                        />
                    </div>
                    {user && user.fromSocial === false && (
                        <Button
                            value="비밀번호 변경"
                            onClick={() => {
                                navigate(`/mypage/modify/password`)
                            }}
                            className="w-28"
                        />
                    )}
                    <Button
                        value="수정완료"
                        onClick={() => {
                            onUserUpdate()
                        }}
                        className="w-28"
                    />
                    <Button
                        value="탈퇴하기"
                        onClick={e => {
                            WithdrawalId(e)
                        }}
                        className="w-28"
                    />
                </div>
            </div>
        </div>
    )
}
