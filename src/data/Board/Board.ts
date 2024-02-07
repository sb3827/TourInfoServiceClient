export type BoardData = {
    bno: number
    title: string
    content: string
    mno: number
    name: string
}

export type reportBoardResponseData = {
    result: boolean
    data: number
}

export type ResponseBoard = {
    bno: number
    title: string
    images: string[]
    content: string
    isAd: boolean
    isCourse: boolean
    score: number
    likes: number
    isLiked: boolean
    postingPlaceBoardDTOS: placeDTOS[][]
    writerDTO: Writer
    regdate: string
    moddate: string
}

export type Writer = {
    mno: number
    name: string
}

export type placeDTOS = {
    pno: number
    name: string
    lat: number
    lng: number
    src: string
    roadAddress: string
    localAddress: string
    engAddress: string
}

export type ResponseDeleteResult = {
    bno: number
}

export type ResponseResult = {
    bno: number
}

export type CourseBoardListData = {
    bno: number
    title: string
    likes: number
    score: number
    writer: string
    regDate: string
    srcList: string[]
    ad: boolean
}

export type ImageReturnData = {
    ino: number
    src: string
}

// Board 등록 수정
export type savePlaceBoardDTO = {
    bno: number | null // 등록: null, 수정: 기존 bno or request param
    title: string
    content: string
    score: number
    images: number[]
    deleteImages: string[]
    place: number
    writer: number // 사용자 검증
}

export type saveCourseBoardDTO = {
    bno: number | null // 등록: null, 수정: 기존 bno or request param
    title: string
    content: string
    score: number
    images: number[]
    deleteImages: string[]
    coursePlaceList: number[][]
    writer: number // 사용자 검증
}

export type Item = {
    pno: number
    img: string
    pname: string
}

export type AddItem = {
    index: number // 아이템을 추가할 날짜의 인덱스
    item: Item // 추가할 아이템
}

// 삭제할 아이템의 날짜 인덱스와 아이템 인덱스를 나타내는 인터페이스
export type DeleteItemPayload = {
    dayIndex: number // 아이템을 삭제할 날짜의 인덱스
    itemIndex: number // 삭제할 아이템의 인덱스
}

// 아이템을 이동시킬 때 필요한 정보를 나타내는 인터페이스
export type MoveItemPayload = {
    sourceDayIndex: number // 원본 날짜의 인덱스
    targetDayIndex: number // 목표 날짜의 인덱스
    itemIndex: number // 이동시킬 아이템의 인덱스
    targetIndex: number // 목표 날짜에서의 아이템을 삽입할 위치의 인덱스
}

// 아이템을 추가할 때 필요한 정보를 나타내는 인터페이스
export type AddItemAtPositionPayload = {
    dayIndex: number // 아이템을 추가할 날짜의 인덱스
    itemIndex: number // 추가할 위치의 인덱스
    item: Item // 추가할 아이템
}
