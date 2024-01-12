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
    placeDTOS: placeDTOS[][]
    writer: string
    mno: number
    regDate: string
    modDate: string
}

export type placeDTOS = {
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

export type imageReurnData = {
    ino: number
    src: string
}
