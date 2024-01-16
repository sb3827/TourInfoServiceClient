import {FC, useState, useEffect} from 'react'
import {SimpleSouthKoreaMapChart} from 'react-simple-south-korea-map-chart' //우리나라 지도 - 마이페이지에서 사용, 추후에 Map파일과 합치는게 좋을것 같음
import {ShowPlaceCount} from './../api/index'
import {userPlaceCount} from './../data/User/User'

type SimpleMapProps = {
    className?: string
}

// setColorByCount와 data는 필수 props
export const SimpleMap: FC<SimpleMapProps> = ({className}) => {
    const [placeCount, setPlaceCount] = useState<userPlaceCount | null>(null)

    // count값에 해당하는 색 변경
    const setColorByCount = (count: number) => {
        if (count === 0) return '#F1F1F1'
        if (count >= 10) return '#91D9CD'
        if (count >= 5) return '#A9DFD6'
        if (count >= 3) return '#C1E5DF'
        if (count >= 1) return '#D9EBE8'
        else return '#ebfffd'
    }

    const fetchData = async () => {
        try {
            const userPlaceData = await ShowPlaceCount(2)
            setPlaceCount(userPlaceData)
            console.log(userPlaceData)
        } catch (error) {
            console.error('에러 발생', error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const placeCountData = [
        {locale: '부산광역시', count: placeCount?.busan ?? '0'},
        {locale: '대구광역시', count: placeCount?.daegu ?? '0'},
        {locale: '대전광역시', count: placeCount?.daejeon ?? '0'},
        {locale: '광주광역시', count: placeCount?.gwangju ?? '0'},
        {locale: '인천광역시', count: placeCount?.incheon ?? '0'},
        {locale: '제주특별자치도', count: placeCount?.jeju ?? '0'},
        {locale: '강원도', count: placeCount?.kangwon ?? '0'},
        {locale: '경기도', count: placeCount?.kyungki ?? '0'},
        {locale: '충청북도', count: placeCount?.northCC ?? '0'},
        {locale: '전라북도', count: placeCount?.northJL ?? '0'},
        {locale: '경상북도', count: placeCount?.northKS ?? '0'},
        {locale: '세종특별자치시', count: placeCount?.sejong ?? '0'},
        {locale: '서울특별시', count: placeCount?.seoul ?? '0'},
        {locale: '충청남도', count: placeCount?.southCC ?? '0'},
        {locale: '경상남도', count: placeCount?.southKS ?? '0'},
        {locale: '전라남도', count: placeCount?.soutnJL ?? '0'},
        {locale: '울산광역시', count: placeCount?.ulsan ?? '0'}
    ]

    return (
        <div className={className}>
            <SimpleSouthKoreaMapChart
                setColorByCount={setColorByCount}
                data={placeCountData}
            />
        </div>
    )
}
