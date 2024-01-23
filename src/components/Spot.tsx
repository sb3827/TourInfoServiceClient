import {FC, PropsWithChildren, useState, useEffect} from 'react'
import {folderAll} from '../data/Folder/Folder'
import {ShowFolderAll, deleteCart} from '../api/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleMinus} from '@fortawesome/free-solid-svg-icons'
import {useSelector} from 'react-redux'
import {RootState} from '../store/rootReducer'

type SpotProps = {
    src: string // image src
    isRegister: boolean // 등록 페이지 t/f
    onDelete?: () => void // 스팟 삭제
}

// daily course spot component
export const Spot: FC<PropsWithChildren<SpotProps>> = props => {
    return (
        <div className="w-24 m-3 bg-white rounded-lg">
            {props.isRegister && (
                <div className="flex justify-end mt-2 mr-2">
                    <FontAwesomeIcon
                        icon={faCircleMinus}
                        style={{color: '#c2c2c2'}}
                        className="cursor-pointer"
                        onClick={() => {
                            if (props.onDelete) {
                                props.onDelete()
                            }
                        }}
                    />
                </div>
            )}
            <img src={props.src} alt="img" />
            {props.children}
        </div>
    )
}
