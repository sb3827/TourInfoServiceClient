import {FC, PropsWithChildren, useState} from 'react'
import {TextEditor, Input, Button, Rating} from '../../components'
import {DailyCourse} from '../DailyCourse'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

type CourseRegisterProps = {}

export const CourseRegister: FC<PropsWithChildren<CourseRegisterProps>> = () => {
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
    return (
        <div>
            <div className="w-10/12 mx-auto">
                <Input
                    className="my-2 border-black"
                    size={70}
                    placeholder="제목을 입력하세요"></Input>
                <div>장바구니 목록s</div>
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
                    <Button text="취소"></Button>
                    <Button text="등록"></Button>
                </div>
            </div>
        </div>
    )
}
