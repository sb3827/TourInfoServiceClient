export type mainItemData = {
    result: boolean
    data: {
        mostBoardPlace: {
            pno: number
            name: string
            src: string | null
        }[]
        recentlyBoard: {
            bno: number
            title: string
            src: string | null
        }[]
        mostLikeCourse: {
            bno: number
            title: string
            src: string | null
        }[]
        followBoard: {
            bno: number
            title: string
            src: string | null
        }[]
        adBoard: {
            bno: number
            title: string
            src: string | null
        }[]
    }
}
