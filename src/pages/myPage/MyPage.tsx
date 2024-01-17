import {ProfileBox, SimpleMap, WritingButton} from './../../components/index'

export const MyPage = () => {
    return (
        <div>
            <div className="flex flex-row">
                <div className="w-1/2 mt-8 ml-32 mr-8">
                    <ProfileBox />
                </div>
                <div className="w-1/2 mt-8 mr-32">
                    <SimpleMap />
                </div>
            </div>
            <div className="mt-4 ">
                <WritingButton />
            </div>
        </div>
    )
}
