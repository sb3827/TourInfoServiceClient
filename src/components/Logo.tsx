import {Title} from './Texts'
import mainLogo from '../assets/mainLogo.png'
import {useNavigate} from 'react-router-dom'

export const Logo = ({}) => {
    const navigate = useNavigate()
    //메인 페이지로 이동
    function onMain() {
        navigate('/')
    }
    return (
        <div>
            <Title
                onClick={onMain}
                className="flex justify-center mt-10 cursor-pointer -mb-9">
                <img src={mainLogo} className="w-40 sm:w-40 md:w-44 lg:w-52" />
            </Title>
        </div>
    )
}
