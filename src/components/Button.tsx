import React, {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    FC,
    forwardRef,
    PropsWithChildren
} from 'react'

//관리자 페이지 버튼 스타일 - 추후 props(아마 대기목록의 회원 아이디) 더 추가해야함
//FIXME - 영현 styles 하지 말고 htmlattribute 상속 받아서 하는걸로 고쳐줘

// type ButtonProps = {
//     text?: string | React.ReactNode
//     styles?: string
//     onClick?: React.MouseEventHandler<HTMLButtonElement>
// }

type ReactButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>

type ButtonProps = ReactButtonProps & {value?: string}

export const Button = forwardRef<HTMLInputElement, ButtonProps>((props, ref) => {
    const {className: _className, ...buttonProps} = props
    // const className = `btn m-1 p-5 ${styles} border rounded-lg text-white`
    const className = ['btn m-1 p-5 border rounded-lg text-white', _className].join(' ')

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
