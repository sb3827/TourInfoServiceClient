import mainLogo from '../../assets/mainLogo.png'
import {useNavigate} from 'react-router-dom'
import {Title} from './Texts'

export const Logo = ({}) => {
    const navigate = useNavigate()
    //메인 페이지로 이동
    function onMain() {
        navigate('/')
    }
    return (
        <div className="flex justify-center ">
            <Title
                onClick={onMain}
                className="flex justify-center mt-8 -mb-4 cursor-pointer">
                <img src={mainLogo} className="w-24 sm:w-24 md:w-36 lg:w-44" />
            </Title>
        </div>
    )
}
