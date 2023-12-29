import {useState} from 'react'
import {LoadingSppinner, LoginInput, LoginUseButton, Title} from '../../components'
import mainLogo from '../../assets/mainLogo.png'
import {useNavigate} from 'react-router-dom'
import {loginRequest} from '../../api/Login/Login'
import {useDispatch} from 'react-redux'
import {setCookie} from '../../util/cookie'
import {setWithTokenExpire} from '../../util/localStorage'
import Kakao from '../../assets/kakao_btn.png'
import Google from '../../assets/google_btn.png'
import Naver from '../../assets/naver_btn.png'
import {setMno} from '../../store/slices/LoginSlice'

export const Login = () => {
    const [userEmail, setUserEmail] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')
    const [loading, setLoading] = useState<Boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //아이디 state 변경
    function onUserEmailChange(value: string) {
        setUserEmail(value)
    }

    //비밀번호 state 변경
    function onUserPasswordChange(value: string) {
        setUserPassword(value)
    }

    //로그인 버튼 클릭 이벤트
    async function onLoginClick() {
        setLoading(true)
        if (userEmail === '') {
            alert('이메일을 입력하세요')
            setLoading(false)
            return
        } else if (userPassword === '') {
            alert('비밀번호를 입력하세요')
            setLoading(false)
            return
        } else {
            try {
                const data = await loginRequest(userEmail, userPassword)
                const {token, refreshToken} = data.response.tokens

                //토큰은 localStorage에 저장
                setWithTokenExpire('token', token)

                //추후 role 넣어줘야함
                dispatch(setMno(data.response.mno))

                //refreshToken은 쿠키에 저장
                const expiryDate = new Date()
                expiryDate.setHours(expiryDate.getHours() + 3)
                setCookie('refreshToken', refreshToken, {
                    path: '/',
                    //추후에 https로 배포할 경우 주석 제거
                    //secure:true
                    expires: expiryDate
                })
                navigate('/')
            } catch (err) {
                alert('로그인 실패')
            }
        }
        setLoading(false)
    }

    //메인 페이지로 이동
    function onMain() {
        navigate('/')
    }

    //아이디 비밀번호 찾기로 이동
    function onFind() {
        navigate('/find-userInfo')
    }
    //회원가입으로 이동
    function onSignup() {
        navigate('/sign-up')
    }
    return (
        <div className="flex justify-center">
            {loading && <LoadingSppinner />}
            <div className="flex flex-col items-center justify-center w-full ">
                <section className="h-full">
                    <div className="container h-full px-6 py-24">
                        <Title
                            className="flex justify-center cursor-pointer mb-14"
                            onClick={onMain}>
                            <img
                                src={mainLogo}
                                className="w-32 sm:w-32 md:w-52 lg:w-64"
                            />
                        </Title>
                        <div className="flex flex-wrap items-center justify-center h-fit g-6">
                            <div className="hidden mb-0 mr-5 md:w-2/3 md:ml-5 md:mr-0 lg:block lg:w-1/3">
                                <div className="flex justify-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1655722723663-75b47de17a31?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        className="w-full rounded-xl "
                                        alt="Login image"
                                    />
                                </div>
                            </div>
                            <div className="w-full p-8 ml-5 border rounded-lg shadow-xl sm:w-fit md:w-fit lg:w-1/3">
                                <Title className="mt-6 mb-8 text-3xl">LOGIN</Title>
                                {/* 이메일 입력 창 */}
                                <LoginInput
                                    className="mb-6"
                                    value={userEmail}
                                    text="Email"
                                    onChange={onUserEmailChange}
                                />
                                {/* 비밀번호 입력창 */}
                                <LoginInput
                                    className="mb-3"
                                    value={userPassword}
                                    text="Password"
                                    onChange={onUserPasswordChange}
                                />
                                <div className="flex items-center justify-end px-2 mb-3">
                                    <p
                                        onClick={onFind}
                                        className="text-sm text-gray-400 transition-all duration-150 ease-in-out cursor-pointer hover:font-bold hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
                                        아이디/비밀번호 찾기
                                    </p>
                                </div>
                                <LoginUseButton
                                    className="mb-3 bg-primary"
                                    onClick={onLoginClick}>
                                    Login
                                </LoginUseButton>
                                <LoginUseButton
                                    className="bg-darkGreen"
                                    onClick={onSignup}>
                                    회원가입
                                </LoginUseButton>

                                <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p className="mx-4 mb-0 font-semibold text-center text-slate-600 dark:text-neutral-200">
                                        OR
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <div className="flex justify-between w-3/5">
                                        <a
                                            href="http://localhost:8080/oauth2/authorization/naver"
                                            className="w-1/6 cursor-pointer hover:translate-y-0.5 hover:duration-150">
                                            <img src={Naver} alt="네이버 로그인" />
                                        </a>
                                        <a
                                            href="http://localhost:8080/oauth2/authorization/kakao"
                                            className="w-1/6 cursor-pointer hover:translate-y-0.5 hover:duration-150">
                                            <img src={Kakao} alt="카카로 로그인" />
                                        </a>
                                        <a
                                            href="http://localhost:8080/oauth2/authorization/google"
                                            className="w-1/6 cursor-pointer hover:translate-y-0.5 hover:duration-150">
                                            <img src={Google} alt="구글 로그인" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
