import React, {FC} from 'react'
import {ReportInfo, SubBox} from '../../index'
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
            {reportDummy.map((reportData, index) => (
                <ReportInfo key={index} reportData={reportData} />
            ))}
        </SubBox>
    )
}
