import {FC, PropsWithChildren} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleMinus} from '@fortawesome/free-solid-svg-icons'

type SpotProps = {
    src: string // image src
    isRegister: boolean // 등록 페이지 t/f
    onDelete?: () => void // 스팟 삭제
}

// daily course spot component
export const Spot: FC<PropsWithChildren<SpotProps>> = props => {
    return (
        <div className="flex flex-col m-2 rounded-lg ">
            {props.isRegister && (
                <div className="absolute flex justify-end right-1 top-1">
                    <FontAwesomeIcon
                        icon={faCircleMinus}
                        style={{color: '#c2c2c2'}}
                        className="cursor-pointer"
                        onClick={event => {
                            if (props.onDelete) {
                                event.stopPropagation()
                                props.onDelete()
                            }
                        }}
                    />
                </div>
            )}
            <div className="flex justify-center w-24 h-20">
                <img src={props.src} alt="img" className="object-fill h-full p-2 " />
            </div>
            {props.children}
        </div>
    )
}
