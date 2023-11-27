import {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    FC,
    forwardRef,
    PropsWithChildren
} from 'react'

//버튼 스타일

type ReactButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>

type ButtonProps = ReactButtonProps & {value?: string}

export const Button = forwardRef<HTMLInputElement, ButtonProps>((props, ref) => {
    const {className: _className, ...buttonProps} = props
    const className = ['btn m-1 p-5 border rounded-lg', _className].join(' ')

    return (
        <button className={className} onClick={props.onClick}>
            {props.value}
        </button>
    )
})

type DropdownProps = {
    texts: string[]
}

// 버튼st dropdown list
export const DropdownButton: FC<PropsWithChildren<DropdownProps>> = props => {
    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="m-1 btn">
                {props.children}
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {props.texts.map((text, index) => (
                    <li key={index}>
                        <a>{text}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

// icon button dropdown list
export const DropdownIcon: FC<PropsWithChildren<DropdownProps>> = props => {
    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="m-1">
                {props.children}
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {props.texts.map((text, index) => (
                    <li key={index}>
                        <a>{text}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

//Dropdown Select 컴포넌트 - children으로 select 넣으면 사용가능

export const DropdownSelect: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="relative ml-5 ">
            {children}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
            </div>
        </div>
    )
}
