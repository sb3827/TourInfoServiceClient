import type {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import {forwardRef} from 'react'

// prettier-ignore
export type ReactInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement>

//comment
export type InputProps = ReactInputProps & {value?: string}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {className: _className, ...inputProps} = props
    const className = ['input', _className].join(' ')
    return <input ref={ref} {...inputProps} className={className} />
})
