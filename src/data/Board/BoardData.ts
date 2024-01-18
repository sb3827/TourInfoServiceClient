import internal from 'stream'

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
