import {FC, PropsWithChildren, useState} from 'react'
import {Input, Button} from '../../components'

type SignupProps = {}



export const Signup: FC<PropsWithChildren<SignupProps>> = () => {

    const [phoneNumber, setPhoneNumber] = useState("010-");       // default input value 를 설정함
    

    return (
        <div className="flex justify-center items-center h-screen">
          <section className="w-full max-w-[800px] h-auto bg-gray-200 p-8 rounded-lg">
            <div className="text-3xl font-bold mb-8 text-center">Logo</div>
            <div className="text-2xl font-bold mb-8 text-center">Signup</div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex flex-row items-center ">
                <label htmlFor="ID" className="w-24 ml-20 pl-12">
                  아이디
                </label>
                <div>
                  <Input className="p-2 border rounded ml-7" id="ID" />
                  <Button value="중복확인" className="ml-2"></Button>
                </div>
              </div>
              <div className="flex flex-row items-center mb-4">
                <label htmlFor="Password" className="w-24">
                  비밀번호
                </label>
                <Input className="p-2 border rounded" id="Password" />
              </div>
              <div className="flex flex-row items-center mb-4">
                <label htmlFor="Password" className="w-24">
                  비밀번호 재입력
                </label>
                <Input className="p-2 border rounded" id="Password" />
              </div>
              <div className="flex flex-row items-center mb-4">
                <label htmlFor="Username" className="w-24">
                  이름
                </label>
                <Input className="p-2 border rounded" id="Username" />
              </div>
              <div className="flex flex-row items-center mb-4">
                <label htmlFor="Birthdate" className="w-24">
                  생년월일
                </label>
                <Input className="p-2 border rounded" id="Birthdate" placeholder="생년월일 6자리"/>
              </div>
              <div className="flex flex-row items-center mb-4">
                {/* 드랍다운 버튼 추가? */}
                <label htmlFor="PhoneNumber" className="w-24">
                  전화번호
                </label>
                <Input className="p-2 border rounded" id="PhoneNumber" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
                {/* 인증기능? */}
              </div>
              <div className="flex flex-row items-center mb-4">
                <label htmlFor="Email" className="w-24">
                  이메일
                </label>
                <Input className="p-2 border rounded" id="Email" />
              </div>
              <div className="flex justify-center items-center">
                <Button
                  value="가입하기"
                  onClick={() => console.log('Signup Button clicked')}
                ></Button>
                {/* 취소하기 버튼? */}
              </div>
            </div>
          </section>
        </div>
      );
      
      
      
}


