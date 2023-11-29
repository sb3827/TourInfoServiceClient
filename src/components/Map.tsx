import {
    FC,
    useState,
    useCallback,
    PropsWithChildren,
    RefAttributes,
    useRef,
    useEffect
} from 'react'
import {
    Container as MapDiv,
    NaverMap,
    Marker,
    NavermapsProvider,
    useNavermaps
} from 'react-naver-maps'

type MapProps = {
    width: string
    height: string
}

export const Map: FC<MapProps> = ({width, height}) => {
    const ClientId = process.env.N_MAP_CLIENT_ID // nmap client id enviroment variable
    // todo state modify
    const navermaps = useNavermaps()
    const [zoom, setZoom] = useState(13)
    const [draggable, setDraggable] = useState(true)
    const [disableKineticPan, setDisableKineticPan] = useState(true)
    const [tileTransition, setTileTransition] = useState(true)
    const minZoom = 8
    const [scaleControl, setScaleControl] = useState(true)
    const handleZoomChanged = useCallback((zoom: any) => {
        console.log(`zoom: ${zoom}`)
    }, [])

    return (
        <NavermapsProvider ncpClientId={ClientId || ''}>
            <MapDiv
                style={{
                    width: width,
                    height: height
                }}>
                <NaverMap
                    zoomControlOptions={{
                        position: navermaps.Position.TOP_RIGHT
                    }}
                    defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
                    defaultZoom={13}
                    onZoomChanged={handleZoomChanged}
                    // 지도 인터랙션 옵션
                    draggable={draggable}
                    pinchZoom={draggable}
                    scrollWheel={draggable}
                    keyboardShortcuts={draggable}
                    disableDoubleTapZoom={!draggable}
                    disableDoubleClickZoom={!draggable}
                    disableTwoFingerTapZoom={!draggable}
                    // 관성 드래깅 옵션
                    disableKineticPan={disableKineticPan}
                    // 타일 fadeIn 효과
                    tileTransition={tileTransition}
                    // min/max 줌 레벨
                    minZoom={minZoom}
                    maxZoom={21}
                    // 지도 컨트롤
                    scaleControl={scaleControl}
                    logoControl={scaleControl}
                    mapDataControl={scaleControl}
                    mapTypeControl={scaleControl}
                    zoomControl={scaleControl}
                />
            </MapDiv>
        </NavermapsProvider>
    )
}

export const Nmap: FC<PropsWithChildren<RefAttributes<naver.maps.Map>>> = () => {
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
