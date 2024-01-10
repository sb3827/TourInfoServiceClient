export type folder = {
    fno: number
    title: string
    pno: number
    name: string
    src: string
}

export type folderAll = {
    result: boolean
    data: Array<{
        fno: number
        title: string
        pno: number[]
        name: string[]
        src: string[]
    }>
}
