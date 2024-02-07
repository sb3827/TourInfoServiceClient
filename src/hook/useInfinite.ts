import {useEffect, useRef} from 'react'

//아직 사용하지 않음 - 추후에 무한 스크롤 부분 해당 커스텀 훅으로 수정할 예정
export default function useInfinite(callback: () => void) {
    const target = useRef<HTMLDivElement | null>(null)

    const observer = new IntersectionObserver((entries, _observer) => {
        if (entries[0].isIntersecting) {
            console.error('IN!')
            callback()
        }
    })

    useEffect(() => {
        if (target.current) {
            observer.observe(target.current)
        }
        return () => {
            observer.disconnect()
        }
    }, [target])

    return [target, observer] as const
}
