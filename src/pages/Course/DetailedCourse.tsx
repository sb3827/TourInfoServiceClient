import {FC, PropsWithChildren, useEffect, useState} from 'react'
import {
    Title,
    TextBox,
    Slider,
    CoursePostMap,
    PlaceProps,
    DropIcon,
    CourseList
} from '../../components'
import {Reply} from '../Reply'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faHeart,
    faArrowLeft,
    faEllipsisVertical,
    faStar
} from '@fortawesome/free-solid-svg-icons'
import {postText} from "../../dummy data/sb's dummy"
import {coursePostLoad, deleteLike, postLike} from '../../api/Board/board'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {useNavigate, useSearchParams} from 'react-router-dom'

type DetailedCourseType = {
    title?: string
}

export const DetailedCourse: FC<PropsWithChildren<DetailedCourseType>> = () => {
    const [day, setDay] = useState(useSelector((state: RootState) => state.course))
    const [enables, setEnables] = useState<boolean[]>([false, true])
    const [content, setContent] = useState<string>('')
    const [score, setScore] = useState<number>(5)
    const [likes, setLikes] = useState<number>(0)
    const [date, setDate] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [images, setImages] = useState<string[]>(['none'])
    const [writer, setWriter] = useState<string>('undefined')
    const [placesList, setPlacesList] = useState<PlaceProps[][]>([
        [
            {
                name: '서면 거리',
                lat: 35.1584,
                lng: 129.0583,
                roadAddress: '부산광역시 서구 중앙대로 678',
                localAddress: '부산광역시 서구 서면',
                engAddress: '678, Jungang-daero, Seo-gu, Busan'
            }
        ]
    ])

    // user mno
    const user = useSelector((state: RootState) => state.login.mno)!
    const [searchParams] = useSearchParams()
    const bno = searchParams.get('bno')!
    const [report, setReport] = useState<boolean>(false)

    const navigate = useNavigate()
    // left arrow button
    function backPage() {
        // 뒤로가기 로직
        navigate(-1)
    }

    async function loadPage() {
        try {
            const data = await coursePostLoad(parseInt(bno), user != null)
            console.log(data)
            if (!data.isCourse) {
                // 코스정보 에러 처리(front)
                throw new Error('Not Found')
            }
            if (user == data.writerDTO.mno) {
                setEnables([true, false])
            }
            setTitle(data.title) // title
            setScore(data.score) // number of star
            setLikes(data.likes) // number of likes
            setWriter(data.writerDTO.name) // writer
            setLikes(data.likes) // number of likes
            if (data.moddate == data.regdate) {
                setDate('작성일자: ' + data.regdate)
            } else {
                setDate('수정일자: ' + data.moddate)
            }
            // setImages
            if (data.images.length > 0) setImages(data.images)
            setPlacesList(data.postingPlaceBoardDTOS)

            setContent(data.content) // content

            setDay(
                data.postingPlaceBoardDTOS.map(daliyPlace =>
                    daliyPlace.map(place => ({
                        pno: place.pno,
                        pname: place.name,
                        img: ''
                    }))
                )
            )
        } catch (error) {
            // navigate(-1)
        }
    }

    // heart button state
    const [heart, setHeart] = useState<boolean>(false)
    function clickHeart() {
        try {
            // if (!user) return
            if (heart) {
                setLikes(likes - 1)
                deleteLike(user, parseInt(bno))
            } else {
                postLike(user, parseInt(bno))
                setLikes(likes + 1)
            }
            setHeart(!heart)
            console.log(date)
        } catch (error) {
            if (heart) {
                setLikes(likes + 1)
            } else {
                setLikes(likes - 1)
            }
            setHeart(!heart)
        }
    }

    useEffect(() => {
        loadPage()
    }, [])

    const nav = () => navigate(`/board/course/posting/modify?bno=${bno}`)
    const set = () => setReport(!report)

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
                <div className="flex flex-row justify-end">작성자: {writer}</div>
                <div className="flex flex-row justify-end">{date}</div>
            </div>
            <div className="my-2">
                {/*body*/}
                <div className="flex flex-row justify-center">
                    <Slider className="w-1/2">
                        {images.map((image, index) => (
                            <img
                                className="mx-auto my-auto"
                                key={index}
                                src={image}
                                alt="img"></img>
                        ))}
                    </Slider>
                    <Slider className="w-1/2">
                        {placesList.map((places, idx) => (
                            <div key={idx}>
                                {`${idx + 1} 일차`}
                                {<CoursePostMap places={places}></CoursePostMap>}
                            </div>
                        ))}
                    </Slider>
                </div>
                <CourseList create={false} day={day} />
                <TextBox data={content}></TextBox>
            </div>
            <div className="my-2">
                <Reply />
            </div>
        </div>
    )
}
