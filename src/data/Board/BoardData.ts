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
