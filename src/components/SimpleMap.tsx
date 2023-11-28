import {FC} from 'react'
import {SimpleSouthKoreaMapChart} from 'react-simple-south-korea-map-chart' //우리나라 지도 - 마이페이지에서 사용, 추후에 Map파일과 합치는게 좋을것 같음

type SimpleMapProps = {
    className?: string
}

// 더미 데이터
const data = [
    {locale: '부산광역시', count: 5},
    {locale: '대구광역시', count: 3},
    {locale: '서울특별시', count: 1}
]
/////////////////////////////////////////////

// setColorByCount와 data는 필수 props
export const SimpleMap: FC<SimpleMapProps> = ({className}) => {
    // count값에 해당하는 색 변경
    const setColorByCount = (count: number) => {
        if (count === 0) return '#F1F1F1'
        if (count >= 10) return '#91D9CD'
        if (count >= 5) return '#A9DFD6'
        if (count >= 3) return '#C1E5DF'
        if (count >= 1) return '#D9EBE8'
        else return '#ebfffd'
    }
    return (
        <div className={className}>
            <SimpleSouthKoreaMapChart setColorByCount={setColorByCount} data={data} />
        </div>
    )
}
