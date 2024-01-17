import {ProfileBox, SimpleMap, WritingButton} from './../../components/index'

export const MyPage = () => {
    return (
        <div>
            <div className="flex flex-row">
                <div className="w-1/2 mt-8 ml-32 mr-8 border rounded-xl">
                    <ProfileBox />
                </div>
                <div className="w-1/2 mt-8 mr-32 border rounded-xl">
                    <SimpleMap />
                </div>
            </div>
            <div className="flex justify-center w-full mt-4">
                <WritingButton />
            </div>
        </div>
    )
}
