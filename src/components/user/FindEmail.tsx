import {useState} from 'react'
import {Title, Subtitle, DropdownSelect, Button} from '../../components'
import {FindEmailRequest} from '../../api/Find/Find'
import {useDispatch} from 'react-redux'
import {setName, setPhone} from '../../store/slices/FindSlice'

export const FindEmail = () => {
    const [userName, setUserName] = useState<string>('')
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>('')
    const dispatch = useDispatch()

    // 이름 state 변경
    function onUserNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserName(e.target.value)
    }

    // 휴대폰번호 state 변경
    function onUserPhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserPhoneNumber(e.target.value)
    }

    // 이메일 찾기 버튼 클릭시 이벤트
    async function onEmailFindClicked() {
        if (userName === '') {
            alert('이름을 입력하세요')
            return
        }
        if (userPhoneNumber === '') {
            alert('휴대폰 번호를 입력하세요')
            return
        }
        try {
            console.log('userName : ', userName, 'userPhoneNumber : ', userPhoneNumber)
            const data = await FindEmailRequest(userName, userPhoneNumber)
            dispatch(setName(userName))
            dispatch(setPhone(userPhoneNumber))
            alert('가입한 이메일 : ' + data.email)
        } catch (error) {
            alert('요청 실패')
            console.log(error)
        }
    }

    return (
        <div className="h-full p-8 border rounded-lg md:w-11/12 lg:ml-6 lg:w-11/12">
            <div className="">
                <Title className="my-6 text-[#609966]">계정 찾기</Title>

                {/* 이름 입력창 */}
                <div className="relative mb-6 " data-te-input-wrapper-init>
                    <input
                        type="text"
                        className="focus:border-primary-focus border rounded-lg peer block min-h-[auto] w-full bg-transparent px-3 pt-3 pb-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput33"
                        value={userName}
                        onChange={onUserNameChange}
                    />
                    <label
                        htmlFor="exampleFormControlInput33"
                        className={`pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.7rem] peer-focus:scale-[0.75] peer-focus:text-primary ${
                            userName ? 'translate-y-[-0.7rem] scale-[0.75]' : ''
                        } motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                        이름
                    </label>
                </div>
                {/* 휴대폰번호 입력창 */}
                <div className="relative mb-6 " data-te-input-wrapper-init>
                    <input
                        type="tel"
                        className="focus:border-primary-focus border rounded-lg peer block min-h-[auto] w-full bg-transparent px-3 pt-3 pb-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput33"
                        value={userPhoneNumber}
                        onChange={onUserPhoneNumberChange}
                    />
                    <label
                        htmlFor="exampleFormControlInput33"
                        className={`pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.7rem] peer-focus:scale-[0.75] peer-focus:text-primary ${
                            userPhoneNumber ? 'translate-y-[-0.7rem] scale-[0.75]' : ''
                        } motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                        전화번호
                    </label>
                </div>

                <Button
                    value="이메일 찾기"
                    onClick={onEmailFindClicked}
                    className="bg-[#8EB682] hover:bg-[#609966]"></Button>
            </div>
        </div>
    )
}
