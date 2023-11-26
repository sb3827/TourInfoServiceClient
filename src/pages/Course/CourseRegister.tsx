import {FC, PropsWithChildren, useState} from 'react'
import {TextEditor, Input, Button, Rating} from '../../components'
import {DailyCourse} from '../DailyCourse'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faMinus, faArrowLeft} from '@fortawesome/free-solid-svg-icons'

type CourseRegisterProps = {
    isModify: boolean // true: 수정, false: 등록
}

export const CourseRegister: FC<PropsWithChildren<CourseRegisterProps>> = props => {
    const [days, setDays] = useState<number>(1) // day state
    // create day box for each
    const dailyCourses = Array.from({length: days}).map((_, index) => (
        <DailyCourse key={index} day={index + 1} isRegister={true} />
    ))
    // plus day box
    function daysPlus() {
        setDays(days + 1)
    }
    // minus day box
    function daysMinus() {
        if (days !== 1) setDays(days - 1)
    }
    // left arrow button
    function backPage() {
        // 뒤로가기 로직
        alert('뒤로가기 만들어줘')
    }
    return (
        <div>
            <div className="flex justify-start mx-10 my-6">
                <FontAwesomeIcon
                    className="hover:cursor-pointer"
                    icon={faArrowLeft}
                    size="2xl"
                    onClick={backPage}
                />
            </div>
            <div className="w-10/12 mx-auto">
                <Input
                    className="my-2 border-black"
                    size={70}
                    placeholder="제목을 입력하세요"></Input>
                <div>장바구니 목록s: 해창씨 어서 해줘요</div>
                <div>
                    <div className="flex justify-end mb-2 mr-3">
                        <FontAwesomeIcon
                            className="mx-2 hover:cursor-pointer"
                            icon={faMinus}
                            size="xl"
                            onClick={daysMinus}
                        />
                        <FontAwesomeIcon
                            className="mx-2 hover:cursor-pointer"
                            icon={faPlus}
                            size="xl"
                            onClick={daysPlus}
                        />
                    </div>
                    {dailyCourses}
                </div>
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
        </div>
    )
}
