import {FC, PropsWithChildren, useState} from 'react'
import {Input, Button, DropdownSelect} from '../../components'

type SignupProps = {}

export const Signup: FC<PropsWithChildren<SignupProps>> = () => {
    const [selectValue, setSelectValue] = useState<string>('naver.com')

    function onChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectValue(e.target.value)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <section className="w-auto h-auto p-8 bg-gray-300 rounded-lg">
                <div className="mb-8 text-3xl font-bold text-center">Logo</div>
                <div className="flex flex-row ">
                    <label htmlFor="ID" className="font-bold">
                        이메일
                    </label>
                    <Input className="border rounded" id="Email" />
                    <DropdownSelect>
                        <select
                            onChange={onChangeSelect}
                            value={selectValue}
                            className="block w-full py-3 pl-3 pr-10 leading-tight border border-gray-300 shadow appearance-none rounded-2xl focus:outline-none focus:shadow-outline">
                            <option value="naver.com">naver.com</option>
                            <option value="google.com">google.com</option>
                        </select>
                    </DropdownSelect>
                    <Button value="중복확인" className="ml-2"></Button>
                </div>
                <div className="flex flex-row items-center mb-4">
                    <label htmlFor="Password" className="w-24 font-bold">
                        비밀번호
                    </label>
                    <Input className="p-2 border rounded" id="Password" />
                </div>
                <div className="flex flex-row items-center mb-4">
                    <label htmlFor="Password" className="w-24 font-bold">
                        비밀번호 재입력
                    </label>
                    <Input className="p-2 border rounded" id="Password" />
                </div>
                <div className="flex flex-row items-center mb-4">
                    <label htmlFor="Username" className="w-24 font-bold">
                        이름
                    </label>
                    <Input className="p-2 border rounded" id="Username" />
                </div>
                <div className="flex flex-row items-center mb-4">
                    <label htmlFor="Birthdate" className="w-24 font-bold">
                        생년월일
                    </label>
                    <Input
                        className="p-2 border rounded"
                        id="Birthdate"
                        placeholder="생년월일 6자리"
                    />
                </div>
                <div className="flex flex-row items-center mb-4">
                    <label htmlFor="PhoneNumber" className="w-24 font-bold">
                        휴대폰 번호
                    </label>
                    <Input className="border rounded " id="PhoneNumber1" />
                </div>

                <div className="flex items-center justify-center">
                    <Button
                        value="가입하기"
                        onClick={() => console.log('Signup Button clicked')}></Button>
                </div>
            </section>
        </div>
    )
}
