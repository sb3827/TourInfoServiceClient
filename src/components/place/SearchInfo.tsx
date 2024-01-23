import {FC, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, PlaceCartModal} from '../index'
import {PlaceData} from '../../data/placeSearch'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faCartPlus} from '@fortawesome/free-solid-svg-icons'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import noImage from '../../assets/smallLogo.png'

type SearchResultProps = {
    placeInfoData: PlaceData | null
    mapClick: () => void
}

export const SearchInfo: FC<SearchResultProps> = ({placeInfoData, ...props}) => {
    const navigate = useNavigate()
    const [modalView,setModalView]=useState<boolean>(false)


    //모달 열기
    const onOpenModal=()=>{
        setModalView(true)
    }

    //모달 닫기
    const onCloseModal=()=>{
        setModalView(false)
    }


    // const han

    const user = useSelector((state: RootState) => state.login.mno)!

    const handleReviewClick = () => {
        if (placeInfoData && placeInfoData.pno) {
            // 예상되는 pno 데이터가 있다면
            const {pno} = placeInfoData
            navigate(`/board/place/${pno}`) // 해당 pno를 사용하여 동적 경로로 이동
        } else {
            console.error("No 'pno' data available")
        }
    }

    if (!placeInfoData) {
        // placeInfoData가 없을 때의 처리
        return <div>No data available</div>
    }

    return (
        <div
            className="m-4 border cursor-pointer border-lightGreen card lg:card-side rounded-xl hover:bg-gray-300"
            onClick={props.mapClick}>
            <div className="flex justify-center w-1/2 border border-gray-200 h-72 rounded-xl ">
                {placeInfoData.image && (
                    <img src={placeInfoData.image ?? noImage} alt="Image" className='rounded-lg' />
                )}
            </div>
            <div className=" card-body">
                <div className="flex justify-end">
                    {/* {user && <PlaceCartModal pno={placeInfoData.pno}/>} */}
                    {user && 
                    <label className="btn btn-ghost" onClick={onOpenModal}>
                        <FontAwesomeIcon icon={faCartPlus} className="m-1 text-2xl" />
                    </label>}
                    {modalView && <PlaceCartModal pno={placeInfoData.pno} onCloseModal={onCloseModal}/>}
                </div>
                <div className="flex justify-start">
                    <h2 className="card-title">이름 : {placeInfoData.name}</h2>
                    <h2 className="ml-4 text-gray-400 card-title">
                        {placeInfoData.category}
                    </h2>
                </div>
                <div className="flex justify-start">
                    <h2 className="card-title">주소 : {placeInfoData.localAddress}</h2>
                </div>
                <div className="flex justify-start"></div>
                <div className="flex justify-start">
                    <h2 className="card-title">
                        <FontAwesomeIcon icon={faCartShopping} className="m-1" /> :{' '}
                        {placeInfoData.cart}
                    </h2>
                </div>
                <div className="justify-end card-actions">
                    <Button
                        onClick={handleReviewClick}
                        className="text-white bg-darkGreen"
                        value={'보러가기'}
                    />
                </div>
            </div>
        </div>
    )
}

