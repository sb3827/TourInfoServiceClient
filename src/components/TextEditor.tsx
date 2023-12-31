import {useState, FC, Ref, useRef, forwardRef, useImperativeHandle} from 'react'
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKFinder} from '@ckeditor/ckeditor5-ckfinder'
import axios from 'axios'
import Editor from 'ckeditor5-custom-build/build/ckeditor'

type TextEditorProps = {
    initialValue?: string
    width?: string
    height?: string
    ref?: Ref<EditorRef>
}

export type EditorRef = {
    getImages: FormData | null
    getEditor: () => CKEditor<ClassicEditor> | null
}

export const TextEditor: FC<TextEditorProps> = forwardRef<EditorRef, TextEditorProps>(
    ({initialValue, width, height}, ref) => {
        const [flag, setFlag] = useState(false)
        const imgLink = 'C:workspace\test'
        const ckRef = useRef<CKEditor<ClassicEditor> | null>(null)
        const images = new FormData()

        useImperativeHandle(ref, () => ({
            getImages: images,
            getEditor: () => ckRef.current
        }))

        const customUploadAdapter = (loader: any) => {
            // (2)
            return {
                upload() {
                    return new Promise((resolve, reject) => {
                        loader.file.then((file: File) => {
                            images.append('file', file)

                            axios
                                .post('/api/upload', file)
                                .then(res => {
                                    if (!flag) {
                                        setFlag(true)
                                        //setImage(res.data.filename)
                                    }
                                    resolve({
                                        default: `${imgLink}/${res.data.filename}`
                                    })
                                })
                                .catch(err => reject(err))
                        })
                    })
                }
            }
        }

        function uploadPlugin(editor: any) {
            // (3)
            editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
                return customUploadAdapter(loader)
            }
        }

        return (
            <CKEditor
                editor={CustomEditor}
                config={{
                    ckfinder: {
                        uploadUrl: 'http://localhost:8080/image'
                    },
                    placeholder: initialValue || '내용을 입력하세요',
                    extraPlugins: [uploadPlugin]
                    // extraPlugins: [CKFinder]
                }}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor)
                }}
                onChange={(event, editor) => {
                    const data = editor.getData()
                    console.log({images})
                    console.log({event, editor, data})
                }}
                // onBlur={(event, editor) => {
                //     console.log('Blur.', editor)
                // }}
                // onFocus={(event, editor) => {
                //     console.log('Focus.', editor)
                // }}
                onError={(error, {willEditorRestart}) => {
                    console.log('Error.')
                }}
                ref={ckRef}
            />
        )
    }
)

type TextBoxProps = {
    data: string
}
// show content
export const TextBox: FC<TextBoxProps> = props => {
    return (
        <CKEditor
            editor={CustomEditor}
            disabled={true}
            data={props.data}
            config={{
                toolbar: []
            }}
        />
    )
}
