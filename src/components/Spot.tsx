import {FC, PropsWithChildren} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleMinus} from '@fortawesome/free-solid-svg-icons'

type SpotProps = {
    src: string // image src
    isRegister: boolean // 등록 페이지 t/f
}

// daily course spot component
export const Spot: FC<PropsWithChildren<SpotProps>> = props => {
    return (
        <div className="w-24 m-3 bg-white rounded-lg">
            {props.isRegister && (
                <div className="flex justify-end mt-2 mr-2">
                    <FontAwesomeIcon icon={faCircleMinus} style={{color: '#c2c2c2'}} />
                </div>
            )}
            <img src={props.src} alt="img" />
            {props.children}
        </div>
    )
}
