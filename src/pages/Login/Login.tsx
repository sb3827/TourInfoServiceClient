import {useState} from 'react'
import {LoginInput, LoginUseButton, OAuthButton, Title} from '../../components'
import google from '../../assets/google.svg'

export const Login = () => {
    const [userEmail, setUserEmail] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')

    //아이디 state 변경
    function onUserEmailChange(value: string) {
        setUserEmail(value)
    }

    //비밀번호 state 변경
    function onUserPasswordChange(value: string) {
        setUserPassword(value)
    }

    //로그인 버튼 클릭 이벤트
    function onLoginClick() {
        if (userEmail === '') {
            alert('이메일을 입력하세요')
            return
        } else if (userPassword === '') {
            alert('비밀번호를 입력하세요')
            return
        }
        console.log(userEmail, userPassword)
    }

    return (
        <div className="flex justify-center">
            <div className="box-border flex flex-col items-center justify-center w-full h-screen lg:max-w-screen-xl ">
                <section className="h-screen">
                    <div className="container h-full px-6 py-20">
                        <Title className="mb-10 text-4xl">야! 먹고놀자</Title>
                        <div className="flex flex-wrap items-center justify-center h-fit g-6 lg:justify-center">
                            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                                <div>
                                    <img
                                        src="https://images.unsplash.com/photo-1655722723663-75b47de17a31?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        className="md:w-full lg:w-10/12 rounded-xl opacity-90"
                                        alt="Login image"
                                    />
                                </div>
                            </div>
                            <div className="h-full p-8 border rounded-lg shadow-xl md:w-8/12 lg:ml-6 lg:w-5/12">
                                <div>
                                    <Title className="my-6 text-3xl">LOGIN</Title>
                                    {/* 이메일 입력 창 */}
                                    <LoginInput
                                        value={userEmail}
                                        text="Email"
                                        onChange={onUserEmailChange}
                                    />
                                    {/* 비밀번호 입력창 */}
                                    <LoginInput
                                        value={userPassword}
                                        text="Password"
                                        onChange={onUserPasswordChange}
                                    />
                                    <div className="flex items-center justify-end mb-6">
                                        <a
                                            href="#!"
                                            className="text-sm text-gray-400 transition-all duration-150 ease-in-out hover:font-bold hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
                                            아이디/비밀번호 찾기
                                        </a>
                                    </div>
                                    <LoginUseButton
                                        className="mb-3"
                                        onClick={onLoginClick}>
                                        Login
                                    </LoginUseButton>
                                    <LoginUseButton>Sign Up</LoginUseButton>

                                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                        <p className="mx-4 mb-0 font-semibold text-center text-slate-600 dark:text-neutral-200">
                                            OR
                                        </p>
                                    </div>
                                    <OAuthButton color="bg-slate-100">
                                        {/* 구글 로고 */}
                                        <img className="mr-2" src={google} />
                                        Continue with Google
                                    </OAuthButton>
                                    <OAuthButton
                                        textColor="text-white"
                                        color="bg-naverLogo">
                                        {/* 네이버 로고 */}
                                        <p className="mr-2 font-extrabold ">N</p>
                                        Continue with Naver
                                    </OAuthButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
