import React, {FC} from 'react'

type CourseInfoProps = {
    title?: string
    information?: string
    id?: string
    date?: string
    imageUrl?: string
}

export const CourseInfo: FC<CourseInfoProps> = ({
    title,
    information,
    id,
    date,
    imageUrl
}) => {
    return (
        <div className="flex items-center h-64 p-4 m-2 text-2xl border rounded-lg border--300 bg-slate-300">
            <div className="flex w-1/3 pr-4">
                <img src={imageUrl} alt="" />
            </div>
            <div className="w-2/3">
                <div className="mb-4">{title}</div>
                <div className="mb-4">{information}</div>
                <div className="mb-4">{date}</div>
                <div className="mb-4">{id}</div>
            </div>
        </div>
    )
}
