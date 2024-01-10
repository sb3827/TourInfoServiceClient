import internal from "stream"

export type ResponseBoard = {
    bno: number
    title: string
    content: string
    isAd: boolean
    isCourse: boolean
    score: number
    likes: number
    writer: number //NOTE - fix
    regDate: string
    modDate: string
}

export type ResponseDeleteResult = {
    bno: number
}

export type CourseBoardListData = {
    bno : number
    title: string
    likes: number
    score: number
    writer: string
    regDate: string
    srcList: string[]
    ad: boolean
}