import React, {FC} from 'react'
import {ReportInfo, SubBox, Subtitle} from '../../index'
import {ReportData} from '../../../data/manager'

//신고 박스

type ReportBoxProps = {}

export const ReportBox: FC<ReportBoxProps> = ({}) => {
    //더미 데이터///////////////
    const reportDummy: ReportData[] = [
        {
            reportDate: new Date(),
            listNum: 1,
            userId: 'test',
            reportedUser: 'reportUser',
            reportDetail: 'test...1'
        },
        {
            reportDate: new Date(),
            listNum: 2,
            userId: 'test1',
            reportedUser: 'reportUser2',
            reportDetail: 'test...2'
        },
        {
            reportDate: new Date(),
            listNum: 3,
            userId: 'test3',
            reportedUser: 'reportUser3',
            reportDetail: 'test...3'
        }
    ]
    ///////////////////////////

    return (
        <SubBox>
            <div className="p-3 border-b-2 min-w-fit">
                <div className="flex justify-between w-full ">
                    <div>
                        <Subtitle className="w-40 p-3 min-w-fit">신고날짜</Subtitle>
                    </div>
                    <div>
                        <Subtitle className="w-40 p-3 min-w-fit">게시물 번호</Subtitle>
                    </div>
                    <div>
                        <Subtitle className="w-40 p-3 min-w-fit">신고한 유저</Subtitle>
                    </div>
                    <div>
                        <Subtitle className="w-40 p-3 min-w-fit">신고 유저</Subtitle>
                    </div>
                </div>
            </div>
            {reportDummy.map((reportData, index) => (
                <ReportInfo key={index} reportData={reportData} />
            ))}
        </SubBox>
    )
}
