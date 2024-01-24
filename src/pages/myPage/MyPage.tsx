import {useParams} from 'react-router-dom'
import {ProfileBox, SimpleMap, WritingButton} from './../../components/index'
import {useEffect} from 'react'

export const MyPage = () => {
    const {mno} = useParams()

    return (
        <div>
            <div className="flex flex-row">
                <div className="w-1/2 mt-8 ml-32 mr-8 border rounded-xl">
                    <ProfileBox mno={Number(mno)} />
                </div>
                <div className="w-1/2 mt-8 mr-32 border rounded-xl">
                    <SimpleMap mno={Number(mno)} />
                </div>
            </div>
            <div className="flex justify-center w-full mt-4">
                <WritingButton mno={Number(mno)} />
            </div>
        </div>
    )
}
