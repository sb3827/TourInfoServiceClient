import {FC, PropsWithChildren} from 'react'
import {Box, Title, Spot} from '../../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons'

type DailyCourseType = {
    day: number // 여행 일정 기간
    isRegister: boolean // 등록 페이지 t/f
}

// n일차 일정
export const DailyCourse: FC<PropsWithChildren<DailyCourseType>> = props => {
    return (
        <Box>
            <div>
                <Title>{props.day}일차</Title>
                <div className="flex items-center">
                    <Spot src="" isRegister={props.isRegister}>
                        {'spot'}
                    </Spot>
                    {props.isRegister && (
                        <FontAwesomeIcon
                            className="m-6"
                            icon={faCirclePlus}
                            size="2xl"
                            style={{color: '#c2c2c2'}}
                        />
                    )}
                </div>
            </div>
        </Box>
    )
}
