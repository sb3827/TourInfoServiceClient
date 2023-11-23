import type {FC} from 'react'
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor'
import {CKEditor} from '@ckeditor/ckeditor5-react'

type TextEditorProps = {
    initialValue?: string
    width?: string
    height?: string
}

export const TextEditor: FC<TextEditorProps> = ({initialValue, width, height}) => {
    return (
        <CKEditor
            editor={CustomEditor}
            config={{
                placeholder: initialValue || '내용을 입력하세요'
            }}
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor)
            }}
            onChange={(event, editor) => {
                const data = editor.getData()
                console.log({event, editor, data})
            }}
            onBlur={(event, editor) => {
                console.log('Blur.', editor)
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor)
            }}
            onError={(error, {willEditorRestart}) => {
                console.log('Error.')
            }}
        />
    )
}
