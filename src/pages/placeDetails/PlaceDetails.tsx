import {useState} from 'react'
import {Box, SearchMap, Subtitle, BoardToggle, Title} from '../../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useNavigate, useParams} from 'react-router-dom'
import {faList, faPlus} from '@fortawesome/free-solid-svg-icons'
import {PlaceBoardData} from '../../data'
import PlaceDetailsItem from '../../components/Place/PlaceDetailsItem'

// 장소 상세 페이지
export const PlaceDetails = () => {
    const [place, setPlace] = useState<PlaceBoardData | null>(null)
    const {pno} = useParams()
    const navigate = useNavigate()

    //게시글 작성으로 이동 -> pno pname 넘겨줘야함
    function onPlacePosting() {
        navigate('/board/place/posting/register', {
            state: {clearPlace: clearPlaceData}
        })
    }
    const clearPlaceData = {
        getPno: pno,
        getPname: place && place.name
    }

    function getPlaceData(placeData: PlaceBoardData) {
        setPlace(placeData)
    }

    return (
        <Box>
            <div className="w-1/2">
                <div className="flex justify-center w-full">
                    <div className="flex flex-col justify-around w-full">
                        <Title className="xl:my-3 xl:py-3">{place && place.name}</Title>
                        <div className="overflow-hidden shadow-xl rounded-xl h-5/6 xl:h-full xl:mb-10">
                            <SearchMap
                                places={place && [place]}
                                className="w-full"
                                innerRef={null}
                            />
                        </div>
                    </div>
                </div>
                <p
                    onClick={onPlacePosting}
                    className="fixed flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-darkGreen right-10 xl:right-36 bottom-40 ">
                    <FontAwesomeIcon icon={faPlus} size="lg" color="white" />
                </p>
                <BoardToggle>
                    <Subtitle
                        value="유저 게시글"
                        className={`flex flex-row-reverse items-center text-left`}>
                        <FontAwesomeIcon icon={faList} className="m-1" />
                    </Subtitle>
                    <Subtitle
                        value="광고 게시글"
                        className="flex flex-row-reverse items-center text-left">
                        <FontAwesomeIcon icon={faList} className="m-1" />
                    </Subtitle>
                    <PlaceDetailsItem
                        getPlaceData={getPlaceData}
                        pno={Number(pno)}
                        isAd={false}
                    />
                    <PlaceDetailsItem pno={Number(pno)} isAd={true} />
                </BoardToggle>
            </div>
        </Box>
    )
}
