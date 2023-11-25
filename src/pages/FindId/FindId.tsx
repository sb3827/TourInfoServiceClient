import React, { FC, useState } from 'react';
import { Input, ToggleButton, Button, Subtitle } from '../../components';

type FindFormProps = {      // 아이디 비밀번호 찾기에 입력받을 요소의 props 
  label1: string;
  label2: string;
  buttonValue: string;
};

const FindForm: FC<FindFormProps> = ({ label1, label2, buttonValue }) => (          // 아이디 비밀번호 찾기 토글의 폼
  <>
    <div className="flex flex-row items-center mb-4 mt-10">
      <label htmlFor="Id" className="w-40">
        {label1}
      </label>
      <Input className="p-2 border rounded" id="Id" />
    </div>
    <div className="flex flex-row items-center mb-8">
      <label htmlFor="Email" className="w-40">
        {label2}
      </label>
      <Input className="p-2 border rounded" id="Email" />
    </div>
    <Button value={buttonValue} onClick={() => alert(`${buttonValue.split(' ')[0]}를 이메일로 전송하였습니다`)} />
  </>
);

export const FindId: FC = () => {
  const [nowActivatedTabValue, setNowActivatedTabValue] = useState("FindId");

  return (
    <div className="flex flex-col items-center max-w-md p-6 mx-auto bg-gray-300 rounded-lg shadow-md">
      <div className="mb-8 text-3xl font-bold text-center">Logo</div>
      <ToggleButton>
        <Subtitle
          value="아이디 찾기"
          className="ml-5 text-left flex items-center flex-row-reverse"
          onClick={() => setNowActivatedTabValue("FindId")}
        >
        </Subtitle>
        <Subtitle
          value="비밀번호 찾기"
          className="ml-5 text-left flex items-center flex-row-reverse"
          onClick={() => setNowActivatedTabValue("FindPassword")}
        >
        </Subtitle>
      </ToggleButton>
      {nowActivatedTabValue === 'FindId' && (
        <FindForm label1="이름을 입력하세요" label2="이메일을 입력하세요" buttonValue="아이디 찾기" />
      )}
      {nowActivatedTabValue === 'FindPassword' && (
        <FindForm label1="아이디를 입력하세요" label2="이메일을 입력하세요" buttonValue="비밀번호 찾기" />
      )}
    </div>
  );
};
