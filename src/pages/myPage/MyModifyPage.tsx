import {user} from './../../data/User/User'
import {useState, useEffect, useRef, ChangeEvent} from 'react'
import {ShowUserInfo, onChangeUserData} from './../../api/MyPage/ShowUserInfo'
import {Button} from './../../components/Button'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {Input, MyPocketModal, MyPocketList, MyCart} from './../../components/index'

//TODO 수정하기 버튼 클릭 시 다시 마이페이지로 이동, margin/padding 조정, 이미지 업로드 수정

export const MyModifyPage = () => {
    const [User, setUser] = useState<user | null>(null)
    const [UserName, setUserName] = useState<string>(User ? User.name : '')
    const [UserPhone, setUserPhone] = useState<string>(User ? User.phone : '')
    const [ProfileImage, setProfileImage] = useState<string>(User ? User.image : '')
    const fileInput = useRef<HTMLInputElement | null>(null)

    const userMno = useSelector((state: RootState) => state.login.mno) || 0

    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }

    const onChangeUserPhone = (e: ChangeEvent<HTMLInputElement>) => {
        setUserPhone(e.target.value)
    }

    const onChangeUserImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    const result = reader.result

                    if (typeof result === 'string') {
                        setProfileImage(result)
                        console.log('test ' + result)
                    } else {
                        console.error('Unexpected result type:', typeof result)
                    }
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }

    //정보 수정
    async function onUserUpdate() {
        console.log({
            mno: User!.mno,
            image: ProfileImage,
            name: UserName,
            email: User!.email,
            phone: UserPhone,
            birth: User!.birth,
            role: User!.role
        })
        try {
            const data = await onChangeUserData({
                mno: User!.mno,
                image: ProfileImage,
                name: UserName,
                email: User!.email,
                phone: UserPhone,
                birth: User!.birth,
                role: User!.role
            })
        } catch (err) {
            console.log(err)
        }
    }

    const fetchData = async () => {
        try {
            const userData = await ShowUserInfo(userMno)
            setUser(userData)
            setProfileImage(userData.image)
            setUserName(userData.name)
            setUserPhone(userData.phone)
            console.log(userData)
        } catch (error) {
            console.error('error', error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div className="flex flex-row m-12">
                <div className="items-center w-1/4">
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={onChangeUserImage}
                        ref={fileInput}
                    />
                    <img
                        src={ProfileImage}
                        alt="프로필사진"
                        className="flex justify-center rounded-full cursor-pointer w-60"
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
                            value={UserName}
                        />
                    </div>
                    <div className="p-4">
                        <span className="mr-4">이메일</span>
                        <input
                            type="text"
                            value={User && User.email ? User.email : ''}
                            className="w-64 h-12 rounded-md bg-gray-950 "
                            disabled
                        />
                    </div>
                    <div className="p-4">
                        <span className="mr-4">전화번호</span>
                        <Input
                            className="w-64 bg-white"
                            value={UserPhone}
                            onChange={onChangeUserPhone}
                        />
                    </div>
                    <div className="p-4">
                        <span className="mr-4">생년월일</span>
                        <input
                            type="text"
                            value={User && User.birth ? User.birth : ''}
                            className="w-64 h-12 rounded-md bg-gray-950"
                            disabled
                        />
                    </div>
                    <Button
                        value="수정하기"
                        onClick={() => {
                            onUserUpdate()
                            alert('회원정보를 수정하였습니다.')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
