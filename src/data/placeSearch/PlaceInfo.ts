// 장소 정보 요청 결과
export type PlaceResponseData = {
    data: Array<{
        pno: number
        name: string
        lng: number
        lat: number
        roadAddress: string
        localAddress: string
        engAddress: string
        category: string
        cart: number
        regDate: string
    }>
}

// 장소 정보
export type PlaceData = {
    pno: number
    name: string
    lng: number
    lat: number
    roadAddress: string
    localAddress: string
    engAddress: string
    category: string
    cart: string
    regDate: string
}
