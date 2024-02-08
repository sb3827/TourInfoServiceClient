import {useEffect, useMemo, useRef, useState} from 'react'
import {
    Box,
    SearchMap,
    Subtitle,
    BoardToggle,
    Title,
    DropIcon,
    Input,
    Button
} from '../../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useNavigate, useParams} from 'react-router-dom'
import {faEllipsisVertical, faList, faPlus} from '@fortawesome/free-solid-svg-icons'
import {PlaceBoardData} from '../../data'
import PlaceDetailsItem from '../../components/Place/PlaceDetailsItem'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {deletePlace, modifyPlace} from '../../api'

// 장소 상세 페이지
export const PlaceDetails = () => {
    const postText = ['수정', '신고', '삭제']
    const user = useSelector((state: RootState) => state.login.mno)!
    const role = useSelector((state: RootState) => state.login.role)
    const [enables, setEnables] = useState<boolean[]>([false, true, false])
    const [modifing, setModifing] = useState<boolean>(false)
    const [report, setReport] = useState<boolean>(false)
    const [place, setPlace] = useState<PlaceBoardData | null>(null)
    const {pno} = useParams()
    const navigate = useNavigate()

    const titleRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (role === 'ADMIN') {
            setEnables([true, false, true])
        }
    }, [role])

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

    function modifyTitle() {
        // 제목 수정
        setModifing(true)
    }

    function openModal() {
        // report modal 열기
        setReport(true)
    }
    function closeModal() {
        // report modal 닫기
        setReport(false)
    }
    function requestModify() {
        // 제목 수정 요청
        const title = titleRef.current?.value as string
        if (title === '') {
            alert('장소 명을 작성하세요')
            return
        }
        try {
            if (window.confirm('해당 장소를 수정하시겠습니까?')) {
                modifyPlace({pno: place?.pno!, title: title})
                setPlace(place => ({
                    ...place!,
                    name: title
                }))
                setModifing(false)
            }
        } catch (error) {
            alert('수정 실패')
        }
    }
    function cancel() {
        setModifing(false)
    }

    function delPlace() {
        // 장소 삭제
        try {
            if (window.confirm('해당 장소를 삭제하시겠습니까?')) {
                deletePlace(place?.pno!)
                navigate('/board/place')
            }
        } catch (error) {
            alert('삭제 실패')
        }
    }

    const titleText = useMemo(
        () =>
            place && place.name ? (
                <Title className="xl:my-3 xl:py-3">{place.name}</Title>
            ) : null,
        [place]
    )

    return (
        <Box>
            <div className="w-1/2">
                <div className="flex justify-center w-full">
                    <div className="flex flex-col justify-around w-full">
                        <div className="flex flex-row items-center justify-between">
                            {!modifing && <div></div>}
                            {modifing && (
                                <Input
                                    className="w-full"
                                    placeholder="수정할 이름을 입력해 주세요"
                                    ref={titleRef}></Input>
                            )}
                            {!modifing && titleText}
                            {user && !modifing && (
                                <DropIcon
                                    itemTexts={postText}
                                    itemActions={[modifyTitle, openModal, delPlace]}
                                    itemEnabled={enables}>
                                    <FontAwesomeIcon
                                        className="ml-2 hover:cursor-pointer"
                                        icon={faEllipsisVertical}
                                        size="xl"
                                    />
                                </DropIcon>
                            )}
                            {modifing && (
                                <Button
                                    className="text-white bg-darkGreen"
                                    value={'수정'}
                                    onClick={requestModify}
                                />
                            )}
                            {modifing && (
                                <Button
                                    className="btn-error"
                                    value={'취소'}
                                    onClick={cancel}
                                />
                            )}
                        </div>
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
            {report && <div>report modal 자리</div>}
        </Box>
    )
}
