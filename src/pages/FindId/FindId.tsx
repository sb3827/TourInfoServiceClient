import React, {FC, useState} from 'react'
import {Input, Button} from '../../components'

type FindIdProps = {}

export const FindId: FC<FindIdProps> = () => {
    const [nowActivatedTabValue, setNowActivatedTabValue] = useState('')

    return (
        <div className="flex flex-col items-center max-w-md p-6 mx-auto bg-gray-400 rounded-lg shadow-md">
            <div className="mb-8 text-3xl font-bold text-center">Logo</div>
            <Button
                value="FindId"
                onClick={() => {
                    setNowActivatedTabValue('FindId')
                }}></Button>
            <Button
                value="FindPassword"
                onClick={() => {
                    setNowActivatedTabValue('FindPassword')
                }}></Button>
            {nowActivatedTabValue === 'FindId' && (
                <>
                    <div className="flex flex-row items-center mb-4">
                        <label htmlFor="Name" className="w-40">
                            이름을 입력하세요
                        </label>
                        <Input className="p-2 border rounded" id="Name" />
                    </div>
                    <div className="flex flex-row items-center mb-4">
                        <label htmlFor="Email" className="w-40">
                            이메일을 입력하세요
                        </label>
                        <Input className="p-2 border rounded" id="Email" />
                    </div>
                    <Button value="아이디 찾기"></Button>
                </>
            )}
            {nowActivatedTabValue === 'FindPassword' && (
                <>
                    <div className="flex flex-row items-center mb-4">
                        <label htmlFor="Id" className="w-40">
                            아이디를 입력하세요
                        </label>
                        <Input className="p-2 border rounded" id="Id" />
                    </div>
                    <div className="flex flex-row items-center mb-4">
                        <label htmlFor="Email" className="w-40">
                            이메일을 입력하세요
                        </label>
                        <Input className="p-2 border rounded" id="Email" />
                    </div>
                    <Button value="비밀번호 찾기"></Button>
                </>
            )}
        </div>
    )
}