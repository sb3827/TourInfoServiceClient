import {useState} from 'react'
import {useEffect} from 'react'
import {
    Box,
    SearchMap,
    Subtitle,
    Board,
    BoardBox,
    BoardToggle,
    LoadingSppinner,
    Title
} from '../../components/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {getPlaceDetailsInfo} from '../../api'
import {PlaceBoardData, PlaceData} from '../../data/placeSearch'
import {faList, faPlus} from '@fortawesome/free-solid-svg-icons'

// 장소 상세 페이지
export const PlaceDetails = () => {
    const location = useLocation()
    const placeInfoData: PlaceData = location.state?.placeInfoData

    const placeInfo = [placeInfoData]

    const [boardData, setBoardData] = useState<PlaceBoardData[] | null>(null)
    const {pno} = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<Boolean>(false)

    async function fetchData(pnoParam: string | undefined) {
        const pnoNumber = pnoParam ? Number(pno) : undefined // pno를 숫자로 변환
        try {
            if (pnoNumber !== undefined) {
                setLoading(true)
                const data = await getPlaceDetailsInfo(pnoNumber)
                setBoardData(data)
                setLoading(false)
            }
        } catch (err) {
            console.error('Error fetching data:', err)
            setLoading(false)
        }
    }

    //게시글 작성으로 이동 -> pno pname 넘겨줘야함
    function onPlacePosting() {
        navigate('/board/place/posting/register', {
            state: {clearPlace: clearPlaceData}
        })
    }
    const clearPlaceData = {
        getPno: pno,
        getPname: boardData && boardData[0].name
    }

    useEffect(() => {
        fetchData(pno) // fetchData 함수를 실행하여 초기 데이터를 가져옴
    }, [pno]) // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

    return (
        <Box>
            <div className="w-1/2">
                {loading && <LoadingSppinner />}
                <div className="flex justify-center w-full">
                    <div className="w-full ">
                        <Title className="py-3">
                            {placeInfoData && placeInfoData.name}
                        </Title>
                        {placeInfoData && (
                            <div className="mb-10 overflow-hidden shadow-xl rounded-xl">
                                <SearchMap
                                    places={placeInfo}
                                    className="w-full "
                                    innerRef={null}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <p
                    onClick={onPlacePosting}
                    className="fixed flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-darkGreen right-36 bottom-40">
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
                    <BoardBox>
                        {boardData &&
                            boardData.map(
                                (data: PlaceBoardData) =>
                                    !data.ad && <Board placeBoardData={data} />
                            )}
                    </BoardBox>
                    <BoardBox>
                        {boardData &&
                            boardData.map(
                                (data: PlaceBoardData) =>
                                    data.ad && <Board placeBoardData={data} />
                            )}
                    </BoardBox>
                </BoardToggle>
            </div>
        </Box>
    )
}
