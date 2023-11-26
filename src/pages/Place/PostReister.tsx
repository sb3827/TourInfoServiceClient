import {FC, PropsWithChildren} from 'react'
import {Input, TextEditor, Button, Rating} from '../../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

type PostRegisterProps = {
    isModify: boolean // true: 수정, false: 등록
}

// 장소 포스팅 등록
export const PostRegister: FC<PropsWithChildren<PostRegisterProps>> = props => {
    // left arrow button
    function backPage() {
        // 뒤로가기 로직
        alert('뒤로가기 만들어줘')
    }
    return (
        <div className="w-10/12 mx-auto">
            <div className="flex justify-start mx-10 my-6">
                <FontAwesomeIcon
                    className="hover:cursor-pointer"
                    icon={faArrowLeft}
                    size="2xl"
                    onClick={backPage}
                />
            </div>
            <Input
                className="my-2 border-black"
                size={70}
                placeholder="제목을 입력하세요"></Input>
            <div>장소 입력 부분 지도</div>
            <div className="flex flex-row justify-end mx-6">
                <Rating />
            </div>
            <div className="flex flex-row justify-center my-2">
                <TextEditor width="1000px" height="80vh"></TextEditor>
            </div>
            <div className="flex flex-row justify-end mx-6 my-2">
                {props.isModify && <Button className="btn-error" value={'삭제'} />}
                {props.isModify && <Button className="btn-warning" value={'수정'} />}
                {props.isModify || <Button className="btn-success" value={'등록'} />}
            </div>
        </div>
    )
}
