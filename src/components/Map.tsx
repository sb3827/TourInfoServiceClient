import {FC} from 'react'
import {Container as MapDiv, NaverMap} from 'react-naver-maps'

interface MapProps {
  width: string
  height: string
}

export const Map: FC<MapProps> = ({width, height}) => {
  return (
    <MapDiv
      style={{
        width: width,
        height: height
      }}>
      <NaverMap />
    </MapDiv>
  )
}
