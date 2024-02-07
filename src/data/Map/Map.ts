export type PlaceCommonData = {
    name: string
    lng: number
    lat: number
} & Address

export type Address = {
    roadAddress: string // 도로명
    localAddress: string // 지번
    engAddress: string // 영문
}

export type AddressResult = {
    msg: string // 처리 message
} & Address

export type LatLng = {
    lat: number
    lng: number
}

// marker props
export type PlaceProps = {
    name: string // 장소 이름
} & LatLng &
    Address
