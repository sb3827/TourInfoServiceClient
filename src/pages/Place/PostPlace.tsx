import {FC, PropsWithChildren, useEffect, useState} from 'react'
import {
    Title,
    Map,
    TextBox,
    DropdownIcon,
    Slider,
    PlacePostMap,
    PlaceProps,
    DropIcon
} from '../../components'
import {Reply} from '../Reply'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faHeart,
    faStar,
    faArrowLeft,
    faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons'
import {dummyText, imgsrcs} from "../../dummy data/sb's dummy"
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {ResponseBoard} from '../../data/Board/BoardData'
import {deleteLike, placePostLoad, postLike} from '../../api/Board/board'

type PostPlaceProps = {
    title?: string
}

export const PostPlace: FC<PropsWithChildren<PostPlaceProps>> = () => {
    const postText = ['수정', '신고']
    const [enables, setEnables] = useState<boolean[]>([false, true])
    const [content, setContent] = useState<string>('')
    const [score, setScore] = useState<number>(5)
    const [likes, setLikes] = useState<number>(0)
    const [date, setDate] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [place, setPlace] = useState<PlaceProps>({
        name: '서면 거리',
        lat: 35.1584,
        lng: 129.0583,
        road: '부산광역시 서구 중앙대로 678',
        local: '부산광역시 서구 서면',
        eng: '678, Jungang-daero, Seo-gu, Busan'
    })
    const [report, setReport] = useState<boolean>(false)
    // user mno
    const user = useSelector((state: RootState) => state.login.mno)!
    // board bno
    const [searchParams] = useSearchParams()
    const bno = searchParams.get('bno')!

    // heart button state
    const [heart, setHeart] = useState<boolean>(false)
    function clickHeart() {
        try {
            if (!user) return
            if (heart) {
                setLikes(likes - 1)
                deleteLike(5, parseInt(bno))
                // deleteLike(user, parseInt(bno))
            } else {
                postLike(5, parseInt(bno))
                // postLike(user, parseInt(bno))
                setLikes(likes + 1)
            }
            setHeart(!heart)
        } catch (error) {
            if (heart) {
                setLikes(likes + 1)
            } else {
                setLikes(likes - 1)
            }
            setHeart(!heart)
        }
    }

    const navigate = useNavigate()
    // left arrow button
    function backPage() {
        // 뒤로가기 로직
        navigate(-1)
    }
    const nav = () => navigate(`/board/place/posting/modify?bno=${bno}`)
    const set = () => setReport(!report)

    async function loadPage() {
        try {
            const data = await placePostLoad(parseInt(bno))
            if (data.isCourse) {
                // 코스정보 에러 처리(front)
                throw new Error('Not Found')
            }
            if (user == data.writer) {
                setEnables([true, false])
            }

            setTitle(data.title) // title
            setScore(data.score) // number of star
            //NOTE - setHeart(t/f)
            setLikes(data.likes) // number of likes
            if (data.modDate == data.regDate) {
                setDate('작성일자: ' + data.regDate)
            } else {
                setDate('수정일자: ' + data.modDate)
            }
            //NOTE - 이미지, 지도 처리
            setPlace({
                name: '서면 거리',
                lat: 35.1584,
                lng: 129.0583,
                road: '부산광역시 서구 중앙대로 678',
                local: '부산광역시 서구 서면',
                eng: '678, Jungang-daero, Seo-gu, Busan'
            })

            setContent(data.content) // content
        } catch (error) {
            navigate(-1)
        }
    }
    useEffect(() => {
        loadPage()
    }, [heart])

    return (
        <div className="w-3/4 mx-auto">
            <div className="my-2">
                {/*header*/}
                <div className="flex justify-between my-6">
                    <FontAwesomeIcon
                        className="hover:cursor-pointer"
                        icon={faArrowLeft}
                        size="2xl"
                        onClick={backPage}
                    />
                    <DropIcon
                        itemTexts={postText}
                        itemActions={[nav, set]}
                        itemEnabled={enables}>
                        <FontAwesomeIcon
                            className="hover:cursor-pointer"
                            icon={faEllipsisVertical}
                            size="2xl"
                        />
                    </DropIcon>
                </div>
                <Title>{title}</Title>
                <div className="flex flex-row justify-end">
                    <div className="flex flex-col">
                        <FontAwesomeIcon
                            icon={faStar}
                            size="2xl"
                            style={{color: '#fbfe3e'}}
                        />
                        {score}
                    </div>
                    <div className="flex flex-col ml-4">
                        {heart && (
                            <FontAwesomeIcon
                                className="hover:cursor-pointer"
                                icon={faHeart}
                                size="2xl"
                                style={{color: '#ff3050'}}
                                onClick={clickHeart}
                            />
                        )}
                        {heart || (
                            <FontAwesomeIcon
                                className="hover:cursor-pointer"
                                icon={faHeart}
                                size="2xl"
                                style={{color: '#c2c2c2'}}
                                onClick={clickHeart}
                            />
                        )}
                        {likes}
                    </div>
                </div>
                <div className="flex flex-row justify-end">{date}</div>
            </div>
            <div className="my-2">
                {/*body*/}
                <div className="flex flex-row justify-center">
                    <Slider className="w-1/2">
                        {imgsrcs.map((addr, index) => (
                            <img
                                className="mx-auto my-auto"
                                key={index}
                                src={addr}
                                alt="img"></img>
                        ))}
                    </Slider>
                    <PlacePostMap className="w-1/2" place={place}></PlacePostMap>
                </div>
                <div className="my-2">
                    <TextBox data={content}></TextBox>
                </div>
            </div>
            <div className="my-2">
                {/*footer*/}
                <Reply />
            </div>
            <div>report && null</div>
        </div>
    )
}
