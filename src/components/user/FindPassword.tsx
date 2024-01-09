import {useState} from 'react'
import {Title, Subtitle, DropdownSelect, Button, LoginInput} from '../../components'
import {FindPasswordRequest} from '../../api/Find/Find'
import {useDispatch} from 'react-redux'
import {setEmail} from '../../store/slices/FindSlice'

export const FindPassword = () => {
    const [userEmail, setUserEmail] = useState<string>('')
    const dispatch = useDispatch()
    //이메일 검증
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i

    //이메일 state 변경
    function onUserEmailChange(value: string) {
        setUserEmail(value)
    }

    // 비밀번호 찾기 버튼 클릭시 이벤트
    async function onPasswordFindClicked(
        e?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
    ) {
        //키보드로 입력이 들어왔는데 Enter가 아닌경우 return
        if (
            e?.type === 'keydown' &&
            (e as React.KeyboardEvent<HTMLInputElement>).key !== 'Enter'
        ) {
            return
        }

        if (userEmail === '') {
            alert('이메일을 입력하세요')
            return
        }
        if (!email_regex.test(userEmail)) {
            alert('이메일 형식이 아닙니다')
            return
        }
        try {
            console.log('email : ', userEmail)
            const data = await FindPasswordRequest(userEmail)
            if (data.result) {
                alert('이메일로 임시비밀번호를 전송하였습니다')
            } else {
                alert('일치하는 회원정보가 없습니다')
            }
        } catch (error) {
            alert('요청실패')
            console.log(error)
        }
    }

    return (
        <div className="h-full p-8 border rounded-lg md:w-11/12 lg:ml-6 lg:w-11/12">
            <div className="">
                <Title className="my-6 text-[#609966]">비밀번호 찾기</Title>

                {/* 이메일 입력 창 */}
                <div onKeyDown={onPasswordFindClicked}>
                    <LoginInput
                        className="mb-3"
                        value={userEmail}
                        text="이메일"
                        onChange={onUserEmailChange}
                    />
                </div>
                <Button
                    value="비밀번호 찾기"
                    onClick={onPasswordFindClicked}
                    className="bg-[#8EB682] hover:bg-[#609966]"></Button>
            </div>
        </div>
    )
}
