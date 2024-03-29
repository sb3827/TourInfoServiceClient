import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {duplicatedEmailCheckRequest, signupRequest} from '../../api'
import {setEmail} from '../../store/slices/SignupSlice'
import {SignupData} from '../../data'
import {
    Button,
    DropdownSelect,
    LoadingSppinner,
    LoginInput,
    Subtitle,
    Title
} from '../Common'

export const GeneralMemberSignup = () => {
    const [formData, setFormData] = useState({
        userEmail: '',
        selectValue: '@naver.com',
        userPassword: '',
        repeatPassword: '',
        userName: '',
        userBirthDate: '',
        userPhoneNumber: ''
    })

    const {
        userEmail,
        selectValue,
        userPassword,
        repeatPassword,
        userName,
        userBirthDate,
        userPhoneNumber
    } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isEmailChecked, setIsEmailChecked] = useState<Boolean>(false)
    const [loading, setLoading] = useState<Boolean>(false)

    const [customDomain, setCustomDomain] = useState<string>('@')

    function onChangeCustomDomain(e: React.ChangeEvent<HTMLInputElement>) {
        setCustomDomain(e.target.value)
    }

    //이메일 검증
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
    const phone_regex = /^010-([0-9]{3,4})-([0-9]{4})$/

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
        if (condition) {
            alert(message)
            return true
        }
        return false
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
        if (
            !email_regex.test(
                userEmail + (selectValue == 'custom' ? customDomain : selectValue)
            )
        ) {
            alert('이메일 형식이 아닙니다.')
            return
        }
        try {
            const data = await duplicatedEmailCheckRequest(
                userEmail + (selectValue == 'custom' ? customDomain : selectValue)
            )
            dispatch(
                setEmail(
                    userEmail + (selectValue == 'custom' ? customDomain : selectValue)
                )
            )

            alert(
                data.isDuplicate ? '이미 가입된 이메일입니다' : '사용 가능한 이메일입니다'
            )
            if (!data.isDuplicate) {
                setIsEmailChecked(true)
            }
        } catch (err) {
            alert('이메일 중복 체크 실패')
            console.error(err)
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
        const formattedPhoneNumber = `${userPhoneNumber.slice(
            0,
            3
        )}-${userPhoneNumber.slice(3, 7)}-${userPhoneNumber.slice(7)}`

        if (
            validateInput('비밀번호를 입력해주세요', !userPassword) ||
            validateInput(
                '비밀번호가 일치하지 않습니다!',
                userPassword !== repeatPassword
            ) ||
            validateInput('이름을 입력해주세요', !userName) ||
            validateInput('생년월일을 선택해주세요', !userBirthDate) ||
            validateInput('이메일 중복 체크를 해주세요', !isEmailChecked) ||
            validateInput(
                '올바른 전화번호 형식이 아닙니다',
                !phone_regex.test(formattedPhoneNumber)
            )
        ) {
            return
        } else {
            try {
                setLoading(true)
                const data: SignupData = {
                    email:
                        userEmail +
                        (selectValue == 'custom' ? customDomain : selectValue),
                    password: userPassword,
                    birth: userBirthDate,
                    phone: formattedPhoneNumber,
                    name: userName,
                    role: 'MEMBER'
                }
                if (
                    email_regex.test(
                        userEmail + (selectValue == 'custom' ? customDomain : selectValue)
                    )
                ) {
                    const result = await signupRequest(data)
                    dispatch(
                        setEmail(
                            userEmail +
                                (selectValue == 'custom' ? customDomain : selectValue)
                        )
                    )
                    alert('회원가입성공! 이메일 인증을 진행해주세요')
                    navigate('/login')
                } else {
                    alert('이메일을 확인하세요')
                    setIsEmailChecked(false)
                }
            } catch (err) {
                alert('회원가입 요청 실패')
                console.error(err)
            }
            setLoading(false)
        }
    }

    return (
        <div className="h-full p-8 border rounded-lg md:w-11/12 lg:ml-6 lg:w-11/12">
            {loading && <LoadingSppinner />}
            <div className="">
                <Title className="my-6 mb-8 text-[#609966]">여행의발견 계정 만들기</Title>
                <Subtitle className="text-[#8EB682]">
                    개성 있는 여행을 위한 맞춤형 계획을 세우세요.{' '}
                </Subtitle>
                <Subtitle className="mb-8 text-[#8EB682]">
                    DoT와 함께라면 여행은 더욱 특별해집니다.
                </Subtitle>
                <div onKeyDown={onSignupClicked}>
                    {/* 이메일 입력 창 */}
                    <div className="relative flex flex-row">
                        <LoginInput
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
                                    <option value="@gmail.com">@gmail.com</option>
                                    <option value="@kako.com">@kakao.com</option>
                                    <option value="custom">직접 입력</option>
                                </select>
                                {selectValue === 'custom' && (
                                    <input
                                        type="text"
                                        value={customDomain}
                                        onChange={onChangeCustomDomain}
                                        placeholder="Enter custom domain"
                                        className="block p-2 mt-1 leading-tight bg-white border border-gray-300 shadow appearance-none rounded-2xl focus:outline-none focus:shadow-outline"
                                    />
                                )}
                            </div>
                        </DropdownSelect>
                        <Button
                            value="중복확인"
                            className="ml-4 text-gray-600 bg-green-100 hover:bg-green-400 "
                            onClick={onEmailCheckClicked}></Button>
                    </div>
                    {/* 비밀번호 입력창 */}
                    <LoginInput
                        className="my-6"
                        value={userPassword}
                        type="password"
                        text="비밀번호"
                        onChange={onUserPasswordChange}
                    />
                    {/* 비밀번호 재입력창 */}
                    <LoginInput
                        className="mb-6"
                        value={repeatPassword}
                        type="password"
                        text="비밀번호 재입력"
                        onChange={onRepeatPasswordChange}
                    />
                    {/* 이름 입력창 */}
                    <LoginInput
                        className="mb-6"
                        value={userName}
                        text="이름"
                        onChange={onUserNameChange}
                    />
                    {/* 생년월일 입력창 */}
                    <LoginInput
                        className="mb-6"
                        value={userBirthDate}
                        text=""
                        type="date"
                        onChange={onUserBirthDateChange}
                    />
                    {/* 휴대폰번호 입력창 */}
                    <LoginInput
                        className="mb-6"
                        value={userPhoneNumber}
                        type="phoneNumber"
                        text="전화번호(- 미포함)"
                        onChange={onUserPhoneNumberChange}
                    />
                </div>
                <Button
                    type="button"
                    value="가입하기"
                    className="px-40 text-gray-600 bg-green-200 hover:bg-green-400"
                    onClick={onSignupClicked}></Button>
            </div>
        </div>
    )
}
