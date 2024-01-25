import {Input, Button} from './../../components/index'
import {useState, ChangeEvent, useEffect} from 'react'
import {changePw, ShowUserInfo} from './../../api/MyPage/ShowUserInfo'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

export const EditPassword = () => {
    const [email, setemail] = useState<string>()
    const [oldPassword, setOldPassword] = useState<string>('') // 현재 비밀번호
    const [newPassword, setNewPassword] = useState<string>('') // 새 비밀번호
    const [reNewPassword, setReNewPassword] = useState<string>('') // 새 비밀번호 확인

    const userMno = useSelector((state: RootState) => state.login.mno) || 0
    const navigate = useNavigate()

    // 사용자 email 정보 받아옴
    const fetchData = async () => {
        try {
            const userData = await ShowUserInfo(userMno)
            setemail(userData.email)
        } catch (error) {
            console.error('error', error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    // 현재 비밀번호
    const onChangeOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value)
    }
    // 새 비밀번호
    const onChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value)
    }
    // 새 비밀번호 확인
    const onChangeReNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setReNewPassword(e.target.value)
    }

    // 비밀번호 변경
    const resetPassword = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // 비밀번호 공백 입력 시
        if (oldPassword === '' || newPassword === '' || reNewPassword === '') {
            alert('현재 비밀번호 / 새 비밀번호를 입력해주세요')
        }
        // 새 비밀번호와 새 비밀번호 확인이 일치하지 않을 경우
        else if (newPassword !== reNewPassword) {
            alert('새 비밀번호가 일치하지 않습니다')
        } else if (oldPassword === newPassword) {
            alert('현재 비밀번호와 새로운 비밀번호가 같습니다')
        } else if (window.confirm('수정하시겠습니까?')) {
            if (email) {
                try {
                    await changePw(email, oldPassword, newPassword)
                    alert('비밀번호 변경 완료 \n다시 로그인해주세요')
                    localStorage.removeItem('token')
                    Cookies.remove('refreshToken')
                    navigate(`/login`)
                } catch (error) {
                    alert('비밀번호가 일치하지 않습니다')
                }
            }
        }
    }

    return (
        <div className="">
            <div className="mb-2">
                <h1 className="py-4 text-3xl font-bold">비밀번호 변경</h1>
                <h1 className="text-red-500">
                    다른 아이디/사이트에서 사용한 적 없는 비밀번호
                </h1>
                <h1 className="">이전에 사용한 적 없는 비밀번호가 안전합니다.</h1>
            </div>
            <div className="flex flex-col items-center">
                <Input
                    type="password"
                    className="w-64 mb-4"
                    value={oldPassword}
                    onChange={onChangeOldPassword}
                    placeholder="현재 비밀번호"
                />
                <Input
                    type="password"
                    className="w-64 mb-4"
                    value={newPassword}
                    onChange={onChangeNewPassword}
                    placeholder="새 비밀번호"
                />
                <Input
                    type="password"
                    className="w-64 mb-4"
                    value={reNewPassword}
                    onChange={onChangeReNewPassword}
                    placeholder="새 비밀번호 확인"
                />
                {newPassword === '' ? (
                    ''
                ) : newPassword !== reNewPassword ? (
                    <span className="text-red-600">비밀번호가 일치하지 않습니다</span>
                ) : (
                    <span className="text-green-600">비밀번호가 일치합니다</span>
                )}

                <div className="flex flex-row mt-4">
                    <Button
                        value="수정하기"
                        onClick={e => {
                            resetPassword(e)
                        }}
                    />
                    <Button
                        value="취소하기"
                        onClick={() => {
                            navigate(-1)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
