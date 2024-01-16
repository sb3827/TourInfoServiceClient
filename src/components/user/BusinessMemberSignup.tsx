import {useState} from 'react'
import {Title, Subtitle, DropdownSelect, Button, SignupInput} from '../../components'
import {duplicatedEmailCheckRequest, signupRequest} from '../../api/Signup/Signup'
import {postBusinessCheck} from '../../api/Business/BusinessCheck'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {setEmail} from '../../store/slices/SignupSlice'
import {SignupData} from '../../data/Signup/Signup'

export const BusinessMemberSignup = () => {
    const [formData, setFormData] = useState({
        userEmail: '',
        selectValue: '@naver.com',
        userPassword: '',
        repeatPassword: '',
        userName: '',
        userBirthDate: '',
        userPhoneNumber: '',
        userBusinessCode: ''
    })

    const {
        userEmail,
        selectValue,
        userPassword,
        repeatPassword,
        userName,
        userBirthDate,
        userPhoneNumber,
        userBusinessCode
    } = formData

    const [isEmailChecked, setIsEmailChecked] = useState<Boolean>(false)
    const [isBussinesscodeChecked, setIsBussinesscodeChecked] = useState<Boolean>(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //이메일 검증
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const phone_regex = /^010-([0-9]{3,4})-([0-9]{4})$/

    // 사업자 번호 state 변경
    function onChangeBusinessCode(value: string) {
        setFormData(prevState => ({...prevState, userBusinessCode: value}))
    }
    // 이메일 도메인 select
    function onChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setFormData(prevState => ({...prevState, selectValue: e.target.value}))
    }

    // 이메일 state 변경
    function onUserEmailChange(value: string) {
        setFormData(prevState => ({...prevState, userEmail: value}))
    }

    // 비밀번호 state 변경
    function onUserPasswordChange(value: string) {
        setFormData(prevState => ({...prevState, userPassword: value}))
    }
    function onRepeatPasswordChange(value: string) {
        setFormData(prevState => ({...prevState, repeatPassword: value}))
    }
    // 이름 state 변경
    function onUserNameChange(value: string) {
        setFormData(prevState => ({...prevState, userName: value}))
    }
    // 생년월일 state 변경
    function onUserBirthDateChange(value: string) {
        setFormData(prevState => ({...prevState, userBirthDate: value}))
    }
    // 휴대폰번호 state 변경
    function onUserPhoneNumberChange(value: string) {
        setFormData(prevState => ({...prevState, userPhoneNumber: value}))
    }

    // 회원가입 데이터 유효성 검사
    function validateInput(message: string, condition: boolean) {
        if (!condition) {
            alert(message)
            return true // 유효하지 않은 경우 true 반환
        }
        return false // 유효한 경우 false 반환
    }

    // 이메일 중복 체크 버튼 클릭 이벤트
    async function onEmailCheckClicked(
        e?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
    ) {
        if (e?.type === 'keydown') {
            return
        }
        if (userEmail === '') {
            alert('이메일을 입력하세요')
            return
        }
        if (!email_regex.test(userEmail + selectValue)) {
            alert('이메일 형식이 아닙니다.')
            return
        }
        try {
            const data = await duplicatedEmailCheckRequest(userEmail + selectValue)
            dispatch(setEmail(userEmail + selectValue))

            alert(
                data.isDuplicate ? '이미 가입된 이메일입니다' : '사용 가능한 이메일입니다'
            )
            if (!data.isDuplicate) {
                setIsEmailChecked(true)
            }
        } catch (error) {
            alert('이메일 중복 체크 실패')
            console.log(error)
        }
    }

    // 사업자 번호 인증 버튼 클릭 이벤트
    async function onBusinessCodeCheckClick(
        e?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
    ) {
        if (e?.type === 'keydown') {
            return
        }
        if (userBusinessCode === '') {
            alert('사업자번호를 입력해주세요')
            return
        }
        try {
            const data = await postBusinessCheck([userBusinessCode])
            if (
                // data.data[0].b_stt === "계속사업자"
                data.data[0].tax_type !== '국세청에 등록되지 않은 사업자등록번호입니다.'
            ) {
                alert('사업자 인증 성공')
                setIsBussinesscodeChecked(true)
            } else {
                alert('국세청에 등록되지 않은 사업자등록번호입니다.')
            }
        } catch (error) {
            alert('사업자 번호 인증 요청 실패')
            console.log(error)
        }
    }

    // 가입하기 버튼 클릭시 이벤트
    async function onSignupClicked(
        e?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
    ) {
        //키보드로 입력이 들어왔는데 Enter가 아닌경우 return
        if (
            e?.type === 'keydown' &&
            (e as React.KeyboardEvent<HTMLInputElement>).key !== 'Enter'
        ) {
            return
        }

        if (
            validateInput('비밀번호를 입력해주세요', !userPassword) ||
            validateInput(
                '비밀번호가 일치하지 않습니다!',
                userPassword !== repeatPassword
            ) ||
            validateInput('이름을 입력해주세요', !userName) ||
            validateInput('생년월일을 선택해주세요', !userBirthDate) ||
            validateInput('이메일 중복 체크를 해주세요', !isEmailChecked) ||
            validateInput('사업자 번호를 인증 해주세요', !isBussinesscodeChecked) ||
            validateInput(
                '올바른 전화번호 형식이 아닙니다',
                !phone_regex.test(userPhoneNumber)
            )
        ) {
            return
        }
        try {
            const data: SignupData = {
                email: userEmail + selectValue,
                password: userPassword,
                birth: userBirthDate,
                phone: userPhoneNumber,
                name: userName,
                role: 'BUSINESSPERSON'
            }
            const result = await signupRequest(data)
            dispatch(setEmail(userEmail + selectValue))
            alert('회원가입성공! 이메일 인증을 진행해주세요')
            navigate('/login')
        } catch (error) {
            alert('회원가입 요청 실패')
            console.log(error)
        }
    }

    return (
        <div className="h-full p-8 border rounded-lg md:w-11/12 lg:ml-6 lg:w-11/12">
            <Title className="my-6 text-[#609966]">야! 먹고놀자 계정 만들기</Title>
            <Subtitle className="text-[#8EB682]">
                야! 먹고놀자는 당신의 비즈니스를 홍보하고
            </Subtitle>
            <Subtitle className="mb-8 text-[#8EB682]">
                고객들에게 도달할 수 있는 기회를 제공합니다.
            </Subtitle>

            <div onKeyDown={onSignupClicked}>
                {/* 이메일 입력 창 */}
                <div className="flex flex-row ">
                    <SignupInput
                        value={userEmail}
                        type="email"
                        text="이메일"
                        onChange={onUserEmailChange}
                    />
                    <DropdownSelect>
                        <div className="relative mt-1">
                            <select
                                onChange={onChangeSelect}
                                value={selectValue}
                                className="block py-3 pl-3 pr-10 leading-tight bg-white border border-gray-300 shadow appearance-none rounded-2xl focus:outline-none focus:shadow-outline">
                                <option value="@naver.com">@naver.com</option>
                                <option value="@google.com">@google.com</option>
                                <option value="@kako.com">@kakao.com</option>
                            </select>
                        </div>
                    </DropdownSelect>
                    <Button
                        value="중복확인"
                        className="ml-4 text-gray-600 bg-green-100 hover:bg-green-400 "
                        onClick={onEmailCheckClicked}></Button>
                </div>
                {/* 사업자 번호 입력 창 */}
                <div className="flex flex-row ">
                    <SignupInput
                        className="flex-1 mt-6"
                        value={userBusinessCode}
                        type="text"
                        text="사업자번호"
                        onChange={onChangeBusinessCode}
                    />
                    <Button
                        value="인증"
                        className="text-gray-600 bg-green-100 mt-7 ml-7 hover:bg-green-400"
                        onClick={onBusinessCodeCheckClick}></Button>
                </div>
            </div>
            {/* 비밀번호 입력창 */}
            <SignupInput
                className="my-6"
                value={userPassword}
                type="password"
                text="비밀번호"
                onChange={onUserPasswordChange}
            />
            {/* 비밀번호 재입력창 */}
            <SignupInput
                className="mb-6"
                value={repeatPassword}
                type="password"
                text="비밀번호 재입력"
                onChange={onRepeatPasswordChange}
            />
            {/* 이름 입력창 */}
            <SignupInput
                className="mb-6"
                value={userName}
                type="userName"
                text="이름"
                onChange={onUserNameChange}
            />
            {/* 생년월일 입력창 */}
            <SignupInput
                className="mb-6"
                value={userBirthDate}
                type="date"
                onChange={onUserBirthDateChange}
            />
            {/* 휴대폰번호 입력창 */}
            <SignupInput
                className="mb-6"
                value={userPhoneNumber}
                type="phoneNumber"
                text="전화번호(- 포함)"
                onChange={onUserPhoneNumberChange}
            />

            <Button
                type="button"
                value="가입하기"
                className="px-40 text-gray-600 bg-green-200 hover:bg-green-400"
                onClick={onSignupClicked}></Button>
        </div>
    )
}
