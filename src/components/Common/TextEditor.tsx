import {useState, FC, Ref, useRef, forwardRef, useImperativeHandle} from 'react'
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {EditorRef, ImageReturnData} from '../../data'
import {imageUpload} from '../../api'

type TextEditorProps = {
    initialValue?: string
    width?: string
    height?: string
    ref?: Ref<EditorRef>
}

export const TextEditor: FC<TextEditorProps> = forwardRef<EditorRef, TextEditorProps>(
    ({initialValue}, ref) => {
        const ckRef = useRef<CKEditor<ClassicEditor> | null>(null)
        const [images, setImages] = useState<ImageReturnData[]>([])

        useImperativeHandle(ref, () => ({
            getImages: images,
            getEditor: () => ckRef.current
        }))

        function customUploadAdapter(loader: any) {
            // (2)
            return {
                upload() {
                    return new Promise((resolve, reject) => {
                        const data = new FormData()
                        loader.file.then((file: File) => {
                            data.append('name', file.name)
                            data.append('file', file)

                            imageUpload(file)
                                .then(res => {
                                    setImages([...images, res])
                                    resolve({
                                        default: `${res.src}`
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
                // onReady={editor => {
                //     // You can store the "editor" and use when it is needed.
                //     // console.error('Editor is ready to use!', editor)
                // }}
                onChange={(event, editor) => {
                    const data = editor.getData()
                }}
                // onBlur={(event, editor) => {
                //     console.error('Blur.', editor)
                // }}
                // onFocus={(event, editor) => {
                //     console.error('Focus.', editor)
                // }}
                onError={(err, {willEditorRestart}) => {
                    console.error(err)
                }}
                ref={ckRef}
            />
        )
    }
)

type TextBoxProps = {
    data: string
    id?: string
}
// show content
export const TextBox: FC<TextBoxProps> = props => {
    return (
        <CKEditor
            id={props.id}
            editor={CustomEditor}
            disabled={true}
            data={props.data}
            config={{
                toolbar: []
            }}
        />
    )
}
