import {
    FC,
    useState,
    useCallback,
    PropsWithChildren,
    RefAttributes,
    useRef,
    useEffect,
    DetailedHTMLProps,
    HTMLAttributes
} from 'react'

import {PlaceData} from '../data/placeSearch'

export type Address = {
    road: string // 도로명
    local: string // 지번
    eng: string // 영문
}
export type AddressResult = {
    msg: string // 처리 message
} & Address

// 주소 to 주소 검색
// 사용법 : searchAddressToCoordinate('불정로 6').then(result => console.log(result))
export function searchAddressToCoordinate(address: string): Promise<AddressResult> {
    return new Promise<AddressResult>((resolve, reject) => {
        let result: AddressResult = {
            msg: '',
            road: '',
            local: '',
            eng: ''
        }

        naver.maps.Service.geocode(
            {
                query: address
            },
            function (status, response) {
                if (status === naver.maps.Service.Status.ERROR) {
                    result.msg = 'Something Wrong!'
                    reject(result) // 에러 발생 시 reject를 호출하여 프로미스를 실패 상태로 전환
                } else {
                    result.msg = 'success'

                    if (response.v2.meta.totalCount === 0) {
                        result.msg = 'totalCount ' + response.v2.meta.totalCount
                    }

                    const item = response.v2.addresses[0]

                    if (item.roadAddress) {
                        result.road = item.roadAddress
                    }

                    if (item.jibunAddress) {
                        result.local = item.jibunAddress
                    }

                    if (item.englishAddress) {
                        result.eng = item.englishAddress
                    }

                    resolve(result) // 비동기 작업이 성공적으로 완료되면 resolve를 호출하여 프로미스를 성공 상태로 전환
                }
            }
        )
    })
}

// 주소 생성 함수
function makeAddress(item: any) {
    if (!item) {
        return
    }

    var name = item.name,
        region = item.region,
        land = item.land,
        isRoadAddress = name === 'roadaddr'

    var sido = '',
        sigugun = '',
        dongmyun = '',
        ri = '',
        rest = ''

    if (hasArea(region.area1)) {
        sido = region.area1.name
    }

    if (hasArea(region.area2)) {
        sigugun = region.area2.name
    }

    if (hasArea(region.area3)) {
        dongmyun = region.area3.name
    }

    if (hasArea(region.area4)) {
        ri = region.area4.name
    }

    if (land) {
        if (hasData(land.number1)) {
            if (hasData(land.type) && land.type === '2') {
                rest += '산'
            }

            rest += land.number1

            if (hasData(land.number2)) {
                rest += '-' + land.number2
            }
        }

        if (isRoadAddress === true) {
            if (checkLastString(dongmyun, '면')) {
                ri = land.name
            } else {
                dongmyun = land.name
                ri = ''
            }

            if (hasAddition(land.addition0)) {
                rest += ' ' + land.addition0.value
            }
        }
    }

    function hasArea(area: any) {
        return !!(area && area.name && area.name !== '')
    }

    function hasData(data: any) {
        return !!(data && data !== '')
    }

    function checkLastString(word: any, lastString: any) {
        return new RegExp(lastString + '$').test(word)
    }

    function hasAddition(addition: any) {
        return !!(addition && addition.value)
    }

    return [sido, sigugun, dongmyun, ri, rest].join(' ')
}

// 좌표 to 지도 검색
// 사용법 : searchCoordinateToAddress([37.5666805, 126.9784147]).then(result => console.log(result))
function searchCoordinateToAddress(coord: number[]): Promise<AddressResult> {
    return new Promise<AddressResult>((resolve, reject) => {
        let result: AddressResult = {
            msg: '',
            road: '',
            local: '',
            eng: ''
        }

        naver.maps.Service.reverseGeocode(
            {
                coords: new naver.maps.LatLng(coord[0], coord[1]),
                orders: [
                    naver.maps.Service.OrderType.ADDR,
                    naver.maps.Service.OrderType.ROAD_ADDR
                ].join(',')
            },
            function (status, response) {
                if (status === naver.maps.Service.Status.ERROR) {
                    result.msg = 'Something Wrong!'
                    reject(result) // 에러 발생 시 reject를 호출하여 프로미스를 실패 상태로 전환
                } else {
                    result.msg = 'success'

                    var items = response.v2.results,
                        address = '',
                        htmlAddresses = []

                    for (var i = 0, ii = items.length, item, addrType; i < ii; i++) {
                        item = items[i]
                        address = makeAddress(item) || ''
                        if (item.name === 'roadaddr') {
                            result.road = address
                        } else {
                            result.local = address
                        }
                    }
                    resolve(result)
                }
            }
        )
    })
}

//TODO - deprecated
export const Map: FC<{width: string; height: string}> = () => {
    const mapElement = useRef(null)

    useEffect(() => {
        const {naver} = window
        if (!mapElement.current || !naver) return
        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const location = new naver.maps.LatLng(35.153289, 129.0597855)
        // const maxBoundary = new naver.maps.LatLngBounds(
        //     new naver.maps.LatLng(lat, lng),
        //     new naver.maps.LatLng(lat, lng));
        const mapOptions: naver.maps.MapOptions = {
            disableDoubleClickZoom: true, // 더블 클릭 줌 해제
            draggable: true, // default true
            center: location,
            zoom: 16, // default zoom
            minZoom: 6, // min zoom
            maxZoom: 21, // max zoom
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            },
            // maxBounds: maxBoundary , // 최대 경계
            tileTransition: true, // 타일 fadeIn 효과
            mapDataControl: false, // 저작권 표시
            logoControl: false, // 로고표시
            scaleControl: false // 축적 표시
        }

        const map = new naver.maps.Map(mapElement.current, mapOptions)

        const polyline = new naver.maps.Polyline({
            map: map,
            path: [],
            strokeColor: '#5347AA',
            strokeWeight: 2
        })

        naver.maps.Event.addListener(map, 'click', function (e) {
            const path = polyline.getPath()
            path.push(e.coord)

            new naver.maps.Marker({
                map: map,
                position: e.coord
            })
        })
    }, [])

    return <div ref={mapElement} style={{minHeight: '300px'}}></div>
}

export const PlainMap: FC<
    PropsWithChildren<
        RefAttributes<naver.maps.Map> &
            DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >
> = ({...props}) => {
    const mapElement = useRef(null)

    useEffect(() => {
        const {naver} = window
        if (!mapElement.current || !naver) return
        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const location = new naver.maps.LatLng(35.153289, 129.0597855)
        // const maxBoundary = new naver.maps.LatLngBounds(
        //     new naver.maps.LatLng(lat, lng),
        //     new naver.maps.LatLng(lat, lng));
        const mapOptions: naver.maps.MapOptions = {
            disableDoubleClickZoom: true, // 더블 클릭 줌 해제
            draggable: true, // default true
            center: location,
            zoom: 16, // default zoom
            minZoom: 6, // min zoom
            maxZoom: 21, // max zoom
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            },
            // maxBounds: maxBoundary , // 최대 경계
            tileTransition: true, // 타일 fadeIn 효과
            mapDataControl: false, // 저작권 표시
            logoControl: false, // 로고표시
            scaleControl: false // 축적 표시
        }

        const map = new naver.maps.Map(mapElement.current, mapOptions)

        // const polyline = new naver.maps.Polyline({
        //     map: map,
        //     path: [],
        //     strokeColor: '#5347AA',
        //     strokeWeight: 2
        // })

        // naver.maps.Event.addListener(map, 'click', function (e) {
        //     const path = polyline.getPath()
        //     path.push(e.coord)

        //     new naver.maps.Marker({
        //         map: map,
        //         position: e.coord
        //     })
        // })
    }, [])

    return <div ref={mapElement} style={{minHeight: '300px'}} {...props}></div>
}

export type LatLng = {
    lat: number
    lng: number
}
// marker props
export type PlaceProps = {
    name: string // 장소 이름
} & LatLng &
    Address

type PlacePostMapProps = {
    place: PlaceProps
} & RefAttributes<naver.maps.Map> &
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
// 마커 하나, 드래그 false, 줌 false (Map: 장소포스팅 페이지 맵)
export const PlacePostMap: FC<PropsWithChildren<PlacePostMapProps>> = ({
    place,
    ...props
}) => {
    const mapElement = useRef(null)

    useEffect(() => {
        const {naver} = window
        if (!mapElement.current || !naver) return
        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const location = new naver.maps.LatLng(place.lat, place.lng)
        const mapOptions: naver.maps.MapOptions = {
            disableDoubleClickZoom: true, // 더블 클릭 줌 해제
            draggable: false, // default true
            center: location,
            zoom: 16, // default zoom
            minZoom: 6, // min zoom
            maxZoom: 21, // max zoom
            scrollWheel: false,
            zoomControl: false,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            },
            // maxBounds: maxBoundary , // 최대 경계
            tileTransition: true, // 타일 fadeIn 효과
            mapDataControl: false, // 저작권 표시
            logoControl: false, // 로고표시
            scaleControl: false // 축적 표시
        }

        const map = new naver.maps.Map(mapElement.current, mapOptions)

        const marker = new naver.maps.Marker({
            map: map,
            position: new naver.maps.LatLng(place.lat, place.lng)
        })

        var contentString = ['']

        const infowindow = new naver.maps.InfoWindow({
            content: contentString.join(''),

            //maxWidth: 140,
            backgroundColor: '#eee',
            borderColor: '#2db400',
            borderWidth: 5,
            anchorSize: new naver.maps.Size(30, 30),
            anchorSkew: true,
            anchorColor: '#eee',

            pixelOffset: new naver.maps.Point(20, -20)
        })

        contentString = [
            '<div class="iw_inner">',
            `   <h1>${place.name}</h1>`,
            '   <div>',
            '       <p>',
            `           [도로명 주소] ${place.road} <br />`,
            `           [지  번 주소] ${place.local}<br />`,
            `           [영문명 주소] ${place.eng}<br />`,
            '       </p>',
            '   </div>',
            '</div>'
        ]

        // infowindow의 내용을 업데이트합니다.
        infowindow.setContent(contentString.join(''))

        naver.maps.Event.addListener(marker, 'click', function (e) {
            if (infowindow.getMap()) {
                infowindow.close()
            } else {
                infowindow.open(map, marker)
            }
        })

        infowindow.open(map, marker)
    }, [])

    return <div ref={mapElement} style={{minHeight: '500px'}} {...props}></div>
}

// FIXME 결과 값 리턴 이벤트 @ckd9968
// 마커 하나 찍는 지도 (장소 등록)
export const ChooseMap: FC<
    {
        // 추가
        onAddressChange: (address: string) => void
    } & PropsWithChildren<
        RefAttributes<naver.maps.Map> &
            DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >
> = ({onAddressChange, ...props}) => {
    const mapElement = useRef(null)

    useEffect(() => {
        const {naver} = window
        if (!mapElement.current || !naver) return
        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const location = new naver.maps.LatLng(35.153289, 129.0597855)
        const maxBoundary = new naver.maps.LatLngBounds(
            new naver.maps.LatLng(31.3418403, 124.1530811),
            new naver.maps.LatLng(39.0169875, 132.6949512)
        )
        const mapOptions: naver.maps.MapOptions = {
            disableDoubleClickZoom: true, // 더블 클릭 줌 해제
            draggable: true, // default true
            center: location,
            zoom: 16, // default zoom
            minZoom: 6, // min zoom
            maxZoom: 21, // max zoom
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            },
            maxBounds: maxBoundary, // 최대 경계
            tileTransition: true, // 타일 fadeIn 효과
            mapDataControl: false, // 저작권 표시
            logoControl: false, // 로고표시
            scaleControl: false // 축적 표시
        }

        const map = new naver.maps.Map(mapElement.current, mapOptions)
        const marker = new naver.maps.Marker({
            map: map,
            position: location
        })
        var contentString = ['']
        const infowindow = new naver.maps.InfoWindow({
            content: contentString.join(''),

            //maxWidth: 140,
            backgroundColor: '#eee',
            borderColor: '#2db400',
            borderWidth: 5,
            anchorSize: new naver.maps.Size(30, 30),
            anchorSkew: true,
            anchorColor: '#eee',

            pixelOffset: new naver.maps.Point(20, -20)
        })

        naver.maps.Event.addListener(map, 'click', function (e) {
            marker.setPosition(e.coord)
            // 비동기 함수를 정의합니다.
            async function fetchAddress() {
                try {
                    const result = await searchCoordinateToAddress([
                        e.coord._lat,
                        e.coord._lng
                    ])
                    if (result.msg !== 'success') {
                        throw new Error(result.msg)
                    }

                    contentString = [
                        '<div class="iw_inner">',
                        '   <div>',
                        '       <p>',
                        `           [도로명 주소] ${result.road} <br />`,
                        `           [지  번 주소] ${result.local}<br />`,
                        '       </p>',
                        '   </div>',
                        '</div>'
                    ]

                    // infowindow의 내용을 업데이트합니다.
                    infowindow.setContent(contentString.join(''))
                    onAddressChange(result.local) // 지번 주소 보내주기
                } catch (error) {
                    console.error(error)
                }
            }

            fetchAddress() // 비동기 함수 호출
            infowindow.open(map, marker)
        })
    }, [])

    return <div ref={mapElement} style={{minHeight: '500px'}} {...props}></div>
}

type CoursePostMapProps = {
    places: PlaceProps[]
} & RefAttributes<naver.maps.Map> &
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
// 마커 + polyline 지도 (코스 포스팅 페이지)
// 장소 순서대로 배열 생성하여 입력
// TODO 날짜별 코스 분리-multi polyline, +@날짜별 색상
export const CoursePostMap: FC<PropsWithChildren<CoursePostMapProps>> = ({
    places,
    ...props
}) => {
    const mapElement = useRef(null)

    useEffect(() => {
        const {naver} = window
        if (!mapElement.current || !naver) return
        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const location = getCenter(places)
        const maxBoundary = getBoundary(places)
        const mapOptions: naver.maps.MapOptions = {
            disableDoubleClickZoom: true, // 더블 클릭 줌 해제
            draggable: false, // default true
            center: location,
            zoom: 9, // default zoom
            minZoom: 6, // min zoom
            maxZoom: 21, // max zoom
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            },
            maxBounds: maxBoundary, // 최대 경계
            tileTransition: true, // 타일 fadeIn 효과
            mapDataControl: false, // 저작권 표시
            logoControl: false, // 로고표시
            scaleControl: false // 축적 표시
        }

        const map = new naver.maps.Map(mapElement.current, mapOptions)
        const polyline = new naver.maps.Polyline({
            map: map,
            path: [],
            strokeColor: '#5347AA',
            strokeWeight: 2
        })

        const markers: naver.maps.Marker[] = []
        const infoWindows: naver.maps.InfoWindow[] = []

        places.map(place => {
            const path = polyline.getPath()
            path.push(new naver.maps.LatLng(place.lat, place.lng))

            const maker = new naver.maps.Marker({
                map: map,
                position: new naver.maps.LatLng(place.lat, place.lng)
            })
            markers.push(maker)

            const infowindow = new naver.maps.InfoWindow({
                content: [
                    '<div class="iw_inner">',
                    `   <h1>${place.name}</h1>`,
                    '   <div>',
                    '       <p>',
                    `           [도로명 주소] ${place.road} <br />`,
                    `           [지  번 주소] ${place.local}<br />`,
                    `           [영문명 주소] ${place.eng}<br />`,
                    '       </p>',
                    '   </div>',
                    '</div>'
                ].join(''),

                //maxWidth: 140,
                backgroundColor: '#eee',
                borderColor: '#2db400',
                borderWidth: 5,
                anchorSize: new naver.maps.Size(30, 30),
                anchorSkew: true,
                anchorColor: '#eee',

                pixelOffset: new naver.maps.Point(20, -20)
            })
            infoWindows.push(infowindow)
        })

        naver.maps.Event.addListener(map, 'idle', function () {
            updateMarkers(map, markers)
        })

        function updateMarkers(map: any, markers: any) {
            var mapBounds = map.getBounds()
            var marker, position

            for (var i = 0; i < markers.length; i++) {
                marker = markers[i]
                position = marker.getPosition()

                if (mapBounds.hasLatLng(position)) {
                    showMarker(map, marker)
                } else {
                    hideMarker(map, marker)
                }
            }
        }

        function showMarker(map: any, marker: any) {
            if (marker.setMap()) return
            marker.setMap(map)
        }

        function hideMarker(map: any, marker: any) {
            if (!marker.setMap()) return
            marker.setMap(null)
        }

        // 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
        function getClickHandler(seq: number) {
            return function (e: any) {
                var marker = markers[seq],
                    infoWindow = infoWindows[seq]

                if (infoWindow.getMap()) {
                    infoWindow.close()
                } else {
                    infoWindow.open(map, marker)
                }
            }
        }

        for (var i = 0, ii = markers.length; i < ii; i++) {
            naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i))
        }
    }, [])

    return <div ref={mapElement} style={{minHeight: '500px'}} {...props}></div>
}

type SearchMapProps = {
    places: PlaceData[]
} & RefAttributes<naver.maps.Map> &
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
// 마커들 (검색 페이지)
// FIXME 검색 페이지 이벤트 연동 @honghyibeom
export const SearchMap: FC<PropsWithChildren<SearchMapProps>> = ({places, ...props}) => {
    const mapElement = useRef(null)

    useEffect(() => {
        const {naver} = window
        if (!mapElement.current || !naver) return
        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const location = new naver.maps.LatLng(places[0].lat, places[0].lng)
        const maxBoundary = new naver.maps.LatLngBounds(
            new naver.maps.LatLng(31.3418403, 124.1530811),
            new naver.maps.LatLng(39.0169875, 132.6949512)
        )
        const mapOptions: naver.maps.MapOptions = {
            disableDoubleClickZoom: true, // 더블 클릭 줌 해제
            draggable: true, // default true
            center: location,
            zoom: 12, // default zoom
            minZoom: 6, // min zoom
            maxZoom: 21, // max zoom
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            },
            maxBounds: maxBoundary, // 최대 경계
            tileTransition: true, // 타일 fadeIn 효과
            mapDataControl: false, // 저작권 표시
            logoControl: false, // 로고표시
            scaleControl: false // 축적 표시
        }

        const map = new naver.maps.Map(mapElement.current, mapOptions)

        const markers: naver.maps.Marker[] = []
        const infoWindows: naver.maps.InfoWindow[] = []

        places.map(place => {
            const maker = new naver.maps.Marker({
                map: map,
                position: new naver.maps.LatLng(place.lat, place.lng)
            })
            markers.push(maker)

            const infowindow = new naver.maps.InfoWindow({
                content: [
                    '<div class="iw_inner">',
                    `   <h1>${place.name}</h1>`,
                    '   <div>',
                    '       <p>',
                    `           [도로명 주소] ${place.roadAddress} <br />`,
                    `           [지  번 주소] ${place.localAddress}<br />`,
                    `           [영문명 주소] ${place.engAddress}<br />`,
                    '       </p>',
                    '   </div>',
                    '</div>'
                ].join(''),

                //maxWidth: 140,
                backgroundColor: '#eee',
                borderColor: '#2db400',
                borderWidth: 5,
                anchorSize: new naver.maps.Size(30, 30),
                anchorSkew: true,
                anchorColor: '#eee',

                pixelOffset: new naver.maps.Point(20, -20)
            })
            infoWindows.push(infowindow)
        })

        naver.maps.Event.addListener(map, 'idle', function () {
            updateMarkers(map, markers)
        })

        function updateMarkers(map: any, markers: any) {
            var mapBounds = map.getBounds()
            var marker, position

            for (var i = 0; i < markers.length; i++) {
                marker = markers[i]
                position = marker.getPosition()

                if (mapBounds.hasLatLng(position)) {
                    showMarker(map, marker)
                } else {
                    hideMarker(map, marker)
                }
            }
        }

        function showMarker(map: any, marker: any) {
            if (marker.setMap()) return
            marker.setMap(map)
        }

        function hideMarker(map: any, marker: any) {
            if (!marker.setMap()) return
            marker.setMap(null)
        }

        // 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
        function getClickHandler(seq: number) {
            return function (e: any) {
                var marker = markers[seq],
                    infoWindow = infoWindows[seq],
                    position = marker.getPosition()
                map.panTo(position)

                if (infoWindow.getMap()) {
                    infoWindow.close()
                } else {
                    infoWindow.open(map, marker)
                }
            }
        }

        for (var i = 0, ii = markers.length; i < ii; i++) {
            naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i))
        }
        infoWindows[0].open(map, markers[0])
    }, [places])

    return <div ref={mapElement} style={{minHeight: '500px'}} {...props}></div>
}

function getCenter(latlngs: LatLng[]): naver.maps.LatLng {
    let lat = 0,
        lng = 0

    latlngs.forEach(element => {
        lat += element.lat
        lng += element.lng
    })

    lat /= latlngs.length
    lng /= latlngs.length

    return new naver.maps.LatLng(lat, lng)
}

function getBoundary(latlngs: LatLng[]): naver.maps.LatLngBounds {
    let maxLat = 0,
        maxLng = 0,
        minLat = latlngs[0].lat,
        minLng = latlngs[0].lng

    latlngs.forEach(element => {
        if (maxLat < element.lat) maxLat = element.lat
        if (maxLng < element.lng) maxLng = element.lng
        if (minLat > element.lat) minLat = element.lat
        if (minLng > element.lng) minLng = element.lng
    })

    return new naver.maps.LatLngBounds(
        new naver.maps.LatLng(maxLat, maxLng),
        new naver.maps.LatLng(minLat, minLng)
    )
}
