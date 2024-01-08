import {useState} from 'react'
import {Title, Subtitle, DropdownSelect, Button} from '../../components'
import {FindPasswordRequest} from '../../api/Find/Find'
import {useDispatch} from 'react-redux'
import {setEmail} from '../../store/slices/FindSlice'

export const FindPassword = () => {
    const [userEmail, setUserEmail] = useState<string>('')
    const dispatch = useDispatch()

    //이메일 state 변경
    function onUserEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserEmail(e.target.value)
    }

    // 비밀번호 찾기 버튼 클릭시 이벤트
    async function onPasswordFindClicked() {
        if (userEmail === '') {
            alert('이메일을 입력하세요')
            return
        }
        try {
            console.log('email : ', userEmail)
            const data = await FindPasswordRequest(userEmail)
            dispatch(setEmail(userEmail))
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
                <div className="relative flex flex-row mb-6" data-te-input-wrapper-init>
                    <input
                        type="email"
                        className="border rounded-lg focus:border-primary-focus  peer block min-h-[auto] w-full bg-transparent px-3 pt-3 pb-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput3"
                        value={userEmail}
                        onChange={onUserEmailChange}
                    />
                    <label
                        htmlFor="exampleFormControlInput3"
                        className={`pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.7rem] peer-focus:scale-[0.75] peer-focus:text-primary ${
                            userEmail ? 'translate-y-[-0.7rem] scale-[0.75]' : ''
                        } motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                        이메일
                    </label>
                </div>
                <Button
                    value="비밀번호 찾기"
                    onClick={onPasswordFindClicked}
                    className="bg-[#8EB682] hover:bg-[#609966]"></Button>
            </div>
        </div>
    )
}
