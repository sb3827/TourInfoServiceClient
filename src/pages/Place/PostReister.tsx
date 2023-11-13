import {FC, PropsWithChildren} from 'react'
import {Input, TextEditor, Button, Rating} from '../../components'

type PostRegisterProps = {}

export const PostRegister: FC<PropsWithChildren<PostRegisterProps>> = () => {
    return (
        <div>
            <Input
                className="my-2 border-black"
                size={70}
                placeholder="제목을 입력하세요"></Input>
            <div>장소 입력</div>
            <div className="flex flex-row justify-end mx-6">
                <Rating />
            </div>
            <div className="flex flex-row justify-center my-2">
                <TextEditor width="1000px" height="80vh"></TextEditor>
            </div>
            <div className="flex flex-row justify-end mx-6 my-2">
                <Button value="취소"></Button>
                <Button value="등록"></Button>
            </div>
        </div>
    )
}
