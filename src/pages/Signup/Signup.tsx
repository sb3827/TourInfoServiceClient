import { useState } from 'react'
import { Title, Subtitle, DropdownSelect, Button } from '../../components'

export const Signup = () => {
    const [userEmail, setUserEmail] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [userBirthDate, setUserBirthDate] = useState<string>('')
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>('')
    const [selectValue, setSelectValue] = useState<string>('@naver.com')

    // 이메일 도메인 select
    function onChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectValue(e.target.value)
    }

    //이메일 state 변경
    function onUserEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserEmail(e.target.value)
    }

    //비밀번호 state 변경
    function onUserPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserPassword(e.target.value)
    }
    function onRepeatPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setRepeatPassword(e.target.value)
    }
    // 이름 state 변경
    function onUserNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserName(e.target.value);
    }

    // 생년월일 state 변경
    function onUserBirthDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserBirthDate(e.target.value);
    }

    // 휴대폰번호 state 변경
    function onUserPhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserPhoneNumber(e.target.value);
    }

    // 가입하기 버튼 클릭시 이벤트
    function onSignupClicked() {
        console.log(userEmail + selectValue, userPassword, userName, userBirthDate, userPhoneNumber)
        if (userPassword !== repeatPassword) {
            alert("비밀번호가 일치하지 않습니다!")
            return;
        }
    }



    return (
        <div className="flex justify-center">
            <div className="box-border flex flex-col items-center justify-center w-full h-screen lg:max-w-screen-xl">
                <section className="h-screen">
                    <div className="container h-full px-6 py-24">
                        <Title className="mb-10">야! 먹고놀자</Title>
                        <div className="flex flex-wrap items-center justify-center h-fit g-6 lg:justify-center ">


                            <div className="h-full p-8 border rounded-lg md:w-11/12 lg:ml-6 lg:w-11/12">
                                <div className="">
                                    <Title className="my-6 text-blue-300">야! 먹고놀자 계정 만들기</Title>
                                    <Subtitle >개성 있는 여행을 위한 맞춤형 계획을 세우세요.</Subtitle>
                                    <Subtitle className='mb-8'> 야! 먹고놀자와 함께라면 여행은 더욱 특별해집니다.</Subtitle>
                                    {/* 이메일 입력 창 */}
                                    <div
                                        className="relative mb-6 flex flex-row"
                                        data-te-input-wrapper-init>
                                        <input
                                            type="email"
                                            className="border rounded-lg focus:border-primary-focus  peer block min-h-[auto] w-full bg-transparent px-3 pt-3 pb-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlInput3"
                                            value={userEmail}
                                            onChange={onUserEmailChange}
                                        />
                                        <label
                                            htmlFor="exampleFormControlInput3"
                                            className={`pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.7rem] peer-focus:scale-[0.75] peer-focus:text-primary ${userEmail
                                                ? 'translate-y-[-0.7rem] scale-[0.75]'
                                                : ''
                                                } motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                                            이메일
                                        </label>
                                        <DropdownSelect>
                                            <div className="relative">
                                                <select
                                                    onChange={onChangeSelect}
                                                    value={selectValue}
                                                    className="block  py-3 pl-3 pr-10 leading-tight border border-gray-300 shadow appearance-none rounded-2xl focus:outline-none focus:shadow-outline bg-white">
                                                    <option value="@naver.com">@naver.com</option>
                                                    <option value="@google.com">@google.com</option>
                                                </select>
                                            </div>
                                        </DropdownSelect>
                                        <Button value="중복확인" className="mx-4" ></Button>
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
                                            className={`pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.7rem] peer-focus:scale-[0.75] peer-focus:text-primary ${userPassword
                                                ? 'translate-y-[-0.7rem] scale-[0.75]'
                                                : ''
                                                } motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                                            비밀번호
                                        </label>
                                    </div>
                                    {/* 비밀번호 재입력창 */}
                                    <div
                                        className="relative mb-6 "
                                        data-te-input-wrapper-init>
                                        <input
                                            type="password"
                                            className="focus:border-primary-focus border rounded-lg peer block min-h-[auto] w-full bg-transparent px-3 pt-3 pb-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlInput33"
                                            value={repeatPassword}
                                            onChange={onRepeatPasswordChange}
                                        />
                                        <label
                                            htmlFor="exampleFormControlInput33"
                                            className={`pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.7rem] peer-focus:scale-[0.75] peer-focus:text-primary ${userPassword
                                                ? 'translate-y-[-0.7rem] scale-[0.75]'
                                                : ''
                                                } motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                                            비밀번호 재입력
                                        </label>
                                    </div>
                                    {/* 이름 입력창 */}
                                    <div
                                        className="relative mb-6 "
                                        data-te-input-wrapper-init>
                                        <input
                                            type="text"
                                            className="focus:border-primary-focus border rounded-lg peer block min-h-[auto] w-full bg-transparent px-3 pt-3 pb-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlInput33"
                                            value={userName}
                                            onChange={onUserNameChange}
                                        />
                                        <label
                                            htmlFor="exampleFormControlInput33"
                                            className={`pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.7rem] peer-focus:scale-[0.75] peer-focus:text-primary ${userPassword
                                                ? 'translate-y-[-0.7rem] scale-[0.75]'
                                                : ''
                                                } motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                                            이름
                                        </label>
                                    </div>
                                    {/* 생년월일 입력창 */}
                                    <div
                                        className="relative mb-6 "
                                        data-te-input-wrapper-init>
                                        <input
                                            type="date"
                                            className="focus:border-primary-focus border rounded-lg peer block min-h-[auto] w-full bg-transparent px-3 pt-3 pb-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlInput33"
                                            value={userBirthDate}
                                            onChange={onUserBirthDateChange}
                                        />
                                        <label
                                            htmlFor="exampleFormControlInput33"
                                            className={`pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.7rem] peer-focus:scale-[0.75] peer-focus:text-primary ${userPassword
                                                ? 'translate-y-[-0.7rem] scale-[0.75]'
                                                : ''
                                                } motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                                        </label>
                                    </div>
                                    {/* 휴대폰번호 입력창 */}
                                    <div
                                        className="relative mb-6 "
                                        data-te-input-wrapper-init>
                                        <input
                                            type="tel"
                                            className="focus:border-primary-focus border rounded-lg peer block min-h-[auto] w-full bg-transparent px-3 pt-3 pb-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlInput33"
                                            value={userPhoneNumber}
                                            onChange={onUserPhoneNumberChange}
                                        />
                                        <label
                                            htmlFor="exampleFormControlInput33"
                                            className={`pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.7rem] peer-focus:scale-[0.75] peer-focus:text-primary ${userPassword
                                                ? 'translate-y-[-0.7rem] scale-[0.75]'
                                                : ''
                                                } motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                                            전화번호
                                        </label>
                                    </div>

                                    <button
                                        type="button"
                                        className="mb-3 inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        onClick={onSignupClicked}>
                                        가입하기
                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}