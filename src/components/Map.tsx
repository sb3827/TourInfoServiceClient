import {FC, useState, useCallback} from 'react'
import {
    Container as MapDiv,
    NaverMap,
    Marker,
    NavermapsProvider,
    useNavermaps
} from 'react-naver-maps'

interface MapProps {
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
