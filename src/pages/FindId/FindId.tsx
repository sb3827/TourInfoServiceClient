import React, { FC, useState } from 'react';
import { Input, ToggleButton ,Button,Subtitle} from '../../components';

type FindIdProps = {};

export const FindId: FC<FindIdProps> = () => {
    const [nowActivatedTabValue, setNowActivatedTabValue] = useState("FindId");

    return (
        <div className="flex flex-col items-center max-w-md p-6 mx-auto bg-gray-300 rounded-lg shadow-md">
            <div className="mb-8 text-3xl font-bold text-center">Logo</div>
            <ToggleButton >
                <Subtitle 
                    value="아이디 찾기"
                    className="ml-5 text-left flex items-center flex-row-reverse"
                    onClick={() => setNowActivatedTabValue("FindId")}> 
                </Subtitle>
                <Subtitle 
                    value="비밀번호 찾기"
                    className="ml-5 text-left flex items-center flex-row-reverse"
                    onClick={() => setNowActivatedTabValue("FindPassword")}> 
                </Subtitle>    
            </ToggleButton>
            {nowActivatedTabValue === 'FindId' && (
                <>
                    <div className="flex flex-row items-center mb-4 mt-10">
                        <label htmlFor="Name" className="w-40">
                            이름을 입력하세요
                        </label>
                        <Input className="p-2 border rounded" id="Name" />
                    </div>
                    <div className="flex flex-row items-center mb-8">
                        <label htmlFor="Email" className="w-40">
                            이메일을 입력하세요
                        </label>
                        <Input className="p-2 border rounded" id="Email" />
                    </div>
                    <Button 
                        value="아이디 찾기"
                        onClick={() => alert("아이디를 이메일로 전송하였습니다")}
                        >
                    </Button>
                </>
            )}
            {nowActivatedTabValue === 'FindPassword' && (
                <>
                    <div className="flex flex-row items-center mb-4 mt-10">
                        <label htmlFor="Id" className="w-40">
                            아이디를 입력하세요
                        </label>
                        <Input className="p-2 border rounded" id="Id" />
                    </div>
                    <div className="flex flex-row items-center mb-8">
                        <label htmlFor="Email" className="w-40">
                            이메일을 입력하세요
                        </label>
                        <Input className="p-2 border rounded" id="Email" />
                    </div>
                    <Button 
                        value="비밀번호 찾기"
                        onClick={() => alert("비밀번호를 이메일로 전송하였습니다")}
                        >
                    </Button>
                </>
            )}
        </div>
    );
};
