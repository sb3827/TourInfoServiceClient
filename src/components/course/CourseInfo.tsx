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
    const renderImage = imageUrl && <img src={imageUrl} alt="Image" />

    if (imageUrl) {
        return <div>{renderImage}</div>
    }

    return (
        <div className="flex items-center text-2xl">
            <div className="w-full h-64 border-2 border--300">
                <div>{title}</div>
                <div>{information}</div>
                <div>{date}</div>
                <div>{id}</div>
            </div>
        </div>
    )
}
