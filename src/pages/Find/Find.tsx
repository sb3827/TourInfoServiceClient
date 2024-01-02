import React, {useState} from 'react'
import {Title, FindEmail, FindPassword} from '../../components'

interface FindProps {}

export const Find: React.FC<FindProps> = () => {
    const [activeTab, setActiveTab] = useState<'email' | 'password'>('email')

    function onTabChange(activeTab: 'email' | 'password') {
        setActiveTab(activeTab)
    }

    return (
        <div>
            <div className="flex justify-center">
                <div className="box-border flex flex-col items-center justify-center w-full h-screen lg:max-w-screen-xl">
                    <section className="h-screen">
                        <div className="container h-full px-6 py-24">
                            <div className="flex flex-wrap items-center justify-center h-fit g-6 lg:justify-center">
                                {/* Tab buttons */}
                                <div role="tablist" className="tabs tabs-lifted">
                                    <input
                                        type="radio"
                                        name="my_tabs_2"
                                        role="tab"
                                        className="tab"
                                        aria-label="이메일 찾기"
                                        checked
                                        onClick={() => onTabChange('email')}
                                    />
                                    <div
                                        role="tabpanel"
                                        className="p-6 tab-content bg-base-100 border-base-300 rounded-box">
                                        <FindEmail />
                                    </div>

                                    <input
                                        type="radio"
                                        name="my_tabs_2"
                                        role="tab"
                                        className="tab"
                                        aria-label="비밀번호 찾기"
                                        onClick={() => onTabChange('password')}
                                    />
                                    <div
                                        role="tabpanel"
                                        className="p-6 tab-content bg-base-100 border-base-300 rounded-box">
                                        <FindPassword />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
