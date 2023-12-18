import {ProfileBox, PersonalMap, WritingButton} from './../../components/index'
import {SimpleMap} from './../../components/SimpleMap'

export const MyPage = () => {
    return (
        <div>
            <h1 className="flex items-center justify-center mt-4">마이페이지</h1>
            <div className="flex flex-row">
                <div className="w-1/2 mt-8 ml-32 mr-8">
                    <ProfileBox />
                </div>
                <div className="w-1/2 mt-8 mr-32">
                    <SimpleMap />
                </div>
            </div>
            <div className="mt-8">
                <WritingButton />
            </div>
        </div>
    )
}
