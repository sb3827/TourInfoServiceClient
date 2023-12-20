import {FC} from 'react'
import {ReportInfo, SubBox, Subtitle, UserInfoItemBox} from '../../index'
import {ReportResponseData} from '../../../data/manager'

//신고 박스

type ReportBoxProps = {
    reportData: ReportResponseData | null
}

export const ReportBox: FC<ReportBoxProps> = ({reportData}) => {
    return (
        <SubBox>
            <UserInfoItemBox widthFull={true} justifyAround="justify-around">
                <div className="flex justify-around w-full">
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
            </UserInfoItemBox>
            {reportData?.data.map(reportData => (
                <ReportInfo key={reportData.sno} reportData={reportData} />
            ))}
        </SubBox>
    )
}
