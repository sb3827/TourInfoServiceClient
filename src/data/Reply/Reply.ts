export type replyData = {
    rno: number
    text: string
    parent_rno: number | null
    regDate: string
    mno: number
    name: string
    src: string | null
}

export type registReplyData = {
    text: string
    bno: number
    mno: number
    parentRno: number
}
