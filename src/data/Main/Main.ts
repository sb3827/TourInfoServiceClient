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
            course: boolean | null
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
            course: boolean | null
        }[]
        adBoard: {
            bno: number
            title: string
            src: string | null
            course: boolean | null
        }[]
    }
}
