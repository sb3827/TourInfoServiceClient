// npm i swiper 해야함

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react'
import React, {DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren} from 'react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// import required modules
import {Navigation} from 'swiper/modules'

import {makeClassName} from '../textUtil'
import {cleanSelection} from '@ckeditor/ckeditor5-engine/src/conversion/downcasthelpers'

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

// children으로 전달된 요소들을 React.Children.map을 사용하여 반복,
// children에 포함된 각 요소들을 배열로 변환

export const Slider: FC<PropsWithChildren<DivProps>> = ({
    children,
    className: _className,
    ...props
}) => {
    const className = makeClassName(
        'flex justify-center h-full border rounded-lg bg-slate-300 border--30',
        _className
    )
    const slides = React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
    ))

    return (
        <div className={className}>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {slides}
            </Swiper>
        </div>
    )
}
