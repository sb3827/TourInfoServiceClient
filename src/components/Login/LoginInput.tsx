import React from 'react'
import {ReactInputProps} from '../Input'

type LoginInputProps = {
    value: string
    onChange: (value: string) => void
    className?: string
    text?: string
}

const LoginInput: React.FC<LoginInputProps> = ({value, onChange, className, text}) => {
    return (
        <div className="relative mb-6" data-te-input-wrapper-init>
            <input
                type="text"
                className="border rounded-lg focus:border-primary-focus  peer block min-h-[auto] w-full bg-transparent px-3 pt-3 pb-2 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput3"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            <label
                htmlFor="exampleFormControlInput3"
                className={`pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.7rem] peer-focus:scale-[0.75] peer-focus:text-primary ${
                    value ? 'translate-y-[-0.7rem] scale-[0.75]' : ''
                } motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`}>
                {text}
            </label>
        </div>
    )
}

export default LoginInput
