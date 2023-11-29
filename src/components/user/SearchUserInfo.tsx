import React, {FC} from 'react'

type SearchResultProps = {
    name: string
    profileImage: string
    followingCount: number
    ReviewCount: number
    email: string
}

export const SearchUserInfo: FC<SearchResultProps> = ({
    name,
    profileImage,
    followingCount,
    ReviewCount,
    email
}) => {
    return (
        <div className="shadow stats">
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <img
                        src={profileImage}
                        alt="profileImage"
                        className="w-16 rounded-full"
                    />
                </div>
                <div className="stat-value">{name}</div>
                <div className="stat-title">{email}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                </div>
                <div className="stat-title">Total Following</div>
                <div className="stat-value text-primary">{followingCount}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
                <div className="stat-title">Page Reviews</div>
                <div className="stat-value text-secondary">{ReviewCount}</div>
            </div>
        </div>
    )
}
