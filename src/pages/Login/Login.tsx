import {useState} from 'react'
import {Title} from '../../components'
import {EventTargetContext} from 'react-naver-maps'

export const Login = () => {
    const [userEmail, setUserEmail] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')

    //아이디 state 변경
    function onUserEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserEmail(e.target.value)
    }

    //비밀번호 state 변경
    function onUserPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserPassword(e.target.value)
    }
    console.log(userEmail, userPassword)

    return (
        <div className="flex justify-center">
            <div className="box-border flex flex-col items-center justify-center w-full h-screen lg:max-w-screen-xl">
                <section className="h-screen">
                    <div className="container h-full px-6 py-24">
                        <Title className="mb-10">야! 먹고놀자</Title>
                        <div className="flex flex-wrap items-center justify-center h-fit g-6 lg:justify-center">
                            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                                <div>
                                    <img
                                        // src="https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731_1280.jpg"
                                        src="https://images.unsplash.com/photo-1655722723663-75b47de17a31?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        className="md:w-full lg:w-10/12 rounded-xl opacity-90"
                                        alt="Login image"
                                    />
                                </div>
                            </div>

                            <div className="h-full p-8 border rounded-lg md:w-8/12 lg:ml-6 lg:w-5/12">
                                <div className="">
                                    <Title className="my-6">LOGIN</Title>
                                    {/* 이메일 입력 창 */}
                                    <div
                                        className="relative mb-6"
                                        data-te-input-wrapper-init>
                                        <input
                                            type="text"
                                            className="border rounded-lg focus:border-primary-focus  peer block min-h-[auto] w-full bg-transparent px-3 pt-3 pb-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlInput3"
                                            value={userEmail}
                                            onChange={onUserEmailChange}
                                        />
                                        <label
                                            htmlFor="exampleFormControlInput3"
                                            className={`pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.7rem] peer-focus:scale-[0.75] peer-focus:text-primary ${
                                                userEmail
                                                    ? 'translate-y-[-0.7rem] scale-[0.75]'
                                                    : ''
                                            } motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                                            Email
                                        </label>
                                    </div>
                                    {/* 비밀번호 입력창 */}
                                    <div
                                        className="relative mb-6 "
                                        data-te-input-wrapper-init>
                                        <input
                                            type="password"
                                            className="focus:border-primary-focus border rounded-lg peer block min-h-[auto] w-full bg-transparent px-3 pt-3 pb-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlInput33"
                                            value={userPassword}
                                            onChange={onUserPasswordChange}
                                        />
                                        <label
                                            htmlFor="exampleFormControlInput33"
                                            className={`pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.7rem] peer-focus:scale-[0.75] peer-focus:text-primary ${
                                                userPassword
                                                    ? 'translate-y-[-0.7rem] scale-[0.75]'
                                                    : ''
                                            } motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                                            Password
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-end mb-6">
                                        <a
                                            href="#!"
                                            className="text-sm text-gray-400 transition-all duration-150 ease-in-out hover:font-bold hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">
                                            아이디/비밀번호 찾기
                                        </a>
                                    </div>

                                    <button
                                        type="submit"
                                        className="mb-3 inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        data-te-ripple-init
                                        data-te-ripple-color="light">
                                        Login
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        data-te-ripple-init
                                        data-te-ripple-color="light">
                                        Signup
                                    </button>

                                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                        <p className="mx-4 mb-0 font-semibold text-center text-slate-600 dark:text-neutral-200">
                                            OR
                                        </p>
                                    </div>

                                    <a
                                        className="bg-slate-100 mb-3 flex w-full items-center justify-center rounded px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        href="#!"
                                        role="button"
                                        data-te-ripple-init
                                        data-te-ripple-color="light">
                                        {/* 구글 로고 */}
                                        <svg
                                            className="mr-2"
                                            width="15"
                                            height="15"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M23.04 12.2614C23.04 11.4459 22.9668 10.6618 22.8309 9.90912H12V14.3575H18.1891C17.9225 15.795 17.1123 17.013 15.8943 17.8284V20.7139H19.6109C21.7855 18.7118 23.04 15.7637 23.04 12.2614Z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12 23.4998C15.105 23.4998 17.7081 22.47 19.6109 20.7137L15.8943 17.8282C14.8645 18.5182 13.5472 18.9259 12 18.9259C9.00474 18.9259 6.46951 16.903 5.56519 14.1848H1.72314V17.1644C3.61542 20.9228 7.50451 23.4998 12 23.4998Z"
                                                fill="#34A853"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M5.56523 14.1851C5.33523 13.4951 5.20455 12.758 5.20455 12.0001C5.20455 11.2421 5.33523 10.5051 5.56523 9.81506V6.83551H1.72318C0.944318 8.38801 0.5 10.1444 0.5 12.0001C0.5 13.8557 0.944318 15.6121 1.72318 17.1646L5.56523 14.1851Z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12 5.07386C13.6884 5.07386 15.2043 5.65409 16.3961 6.79364L19.6945 3.49523C17.7029 1.63955 15.0997 0.5 12 0.5C7.50451 0.5 3.61542 3.07705 1.72314 6.83545L5.56519 9.815C6.46951 7.09682 9.00474 5.07386 12 5.07386Z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        Continue with Google
                                    </a>
                                    <a
                                        className="mb-3 flex w-full items-center justify-center rounded bg-naverLogo px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#03c75a] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(e,199,90,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-naverLogo focus:shadow-[0_8px_9px_-4px_rgba(3,199,90,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(3,199,90,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                                        href="#!"
                                        role="button"
                                        data-te-ripple-init
                                        data-te-ripple-color="light">
                                        {/* 네이버 로고 */}
                                        <p className="mr-2 font-extrabold ">N</p>
                                        Continue with Naver
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
