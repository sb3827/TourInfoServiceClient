import {useNavigate, useSearchParams} from 'react-router-dom'
import {setWithTokenExpire} from '../util/localStorage'
import {setCookie} from '../util/cookie'
import {useEffect, useState} from 'react'
import LoadingSppinner from '../components/LoadingSpinner'

export const Oauth2Route = ({}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<Boolean>(false)

    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const refreshToken = searchParams.get('refreshToken')
    useEffect(() => {
        setLoading(true)
        if (token && refreshToken) {
            console.log('test')
            setWithTokenExpire('token', token)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 3)
            setCookie('refreshToken', refreshToken, {
                path: '/',
                //추후에 https로 배포할 경우 주석 제거
                //secure:true
                expires: expiryDate
            })
            setLoading(false)
            navigate('/')
        } else {
            setLoading(false)
            navigate('/login')
        }
    }, [])

    return <>{loading && <LoadingSppinner />}</>
}
