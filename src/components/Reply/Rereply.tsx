import React from 'react'
import {DropdownIcon} from '../Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowTurnUp, faEllipsisVertical, faL} from '@fortawesome/free-solid-svg-icons'
import {dropdownText} from "../../dummy data/sb's dummy"
import {Body, Caption} from '../Texts'
import dummyImage from '../../assets/profileImage.jpeg'
import {replyType} from '../../data/Reply/Reply'

type RereplyProps = {
    viewReply: Boolean
    reReplyData: replyType
}

export const Rereply: React.FC<RereplyProps> = ({viewReply, reReplyData}) => {
    return (
        <div
            className={`border-b border-lightGreen flex items-end justify-end w-full ${
                viewReply ? '' : 'hidden '
            }`}>
            <div className="flex justify-center w-11/12 ">
                <div className="flex items-center justify-center mr-5">
                    <FontAwesomeIcon icon={faArrowTurnUp} rotation={90} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div>
                        <img
                            className="w-10"
                            src={reReplyData.src ? reReplyData.src : dummyImage}
                        />
                    </div>
                    <div className="flex items-center">{reReplyData.name}</div>
                </div>
                <div className="flex flex-col w-5/6">
                    <div className="flex justify-end mx-4 my-2">
                        <DropdownIcon texts={dropdownText}>
                            <FontAwesomeIcon
                                className="hover:cursor-pointer"
                                icon={faEllipsisVertical}
                                size="lg"
                            />
                        </DropdownIcon>
                    </div>
                    <div className="flex items-center justify-start mx-6">
                        <Body className="text-left">{reReplyData.text}</Body>
                    </div>
                    <div className="flex justify-end mx-4 my-2">
                        <Caption>작성일자: {reReplyData.regDate}</Caption>
                    </div>
                </div>
            </div>
        </div>
    )
}
