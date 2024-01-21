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
            mainBoardResponseDTO: {
                bno: number
                title: string
                src: string | null
                course: boolean | null
            }
            placeList: {
                name: string
                lat: number
                lng: number
                localAddress: string
                engAddress: string
                roadAddress: string
            }[]
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
