import React, {useState} from 'react'
import {Title} from '../../components'
import {GeneralMemberSignup, BusinessMemberSignup} from './index'

interface SignupProps {}

export const Signup: React.FC<SignupProps> = () => {
    const [activeTab, setActiveTab] = useState<'general' | 'business'>('general')

    function onTabChange(activeTab: 'general' | 'business') {
        setActiveTab(activeTab)
    }

    return (
        <div>
            <div className="flex justify-center">
                <div className="box-border flex flex-col items-center justify-center w-full lg:max-w-screen-xl">
                    <section>
                        <div className="container h-full px-6 py-24">
                            <div className="flex flex-wrap items-center justify-center g-6 lg:justify-center">
                                {/* Tab buttons */}
                                <div role="tablist" className="tabs tabs-lifted">
                                    <input
                                        type="radio"
                                        name="my_tabs_2"
                                        role="tab"
                                        className="tab"
                                        aria-label="일반 회원 가입"
                                        checked
                                        onClick={() => onTabChange('general')}
                                    />
                                    <div
                                        role="tabpanel"
                                        className="p-6 tab-content bg-base-100 border-base-300 rounded-box">
                                        <GeneralMemberSignup />
                                    </div>

                                    <input
                                        type="radio"
                                        name="my_tabs_2"
                                        role="tab"
                                        className="tab"
                                        aria-label="사업자 회원 가입"
                                        onClick={() => onTabChange('business')}
                                    />
                                    <div
                                        role="tabpanel"
                                        className="p-6 tab-content bg-base-100 border-base-300 rounded-box">
                                        <BusinessMemberSignup />
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
