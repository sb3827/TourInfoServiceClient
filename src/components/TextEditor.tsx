import {useState, FC} from 'react'
import CustomEditor from 'ckeditor5-custom-build/build/ckeditor'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import axios from 'axios'

type TextEditorProps = {
    initialValue?: string
    width?: string
    height?: string
}

export const TextEditor: FC<TextEditorProps> = ({initialValue, width, height}) => {
    const [flag, setFlag] = useState(false)
    const imgLink = 'C:workspace\test'

    const customUploadAdapter = (loader: any) => {
        // (2)
        return {
            upload() {
                return new Promise((resolve, reject) => {
                    const data = new FormData()
                    loader.file.then((file: File) => {
                        data.append('name', file.name)
                        data.append('file', file)

                        //TODO axios 전송로직 추후 작성
                        /*axios
                            .post('/api/upload', data)
                            .then(res => {
                                if (!flag) {
                                    setFlag(true)
                                    //setImage(res.data.filename);
                                }
                                resolve({
                                    default: `${imgLink}/${res.data.filename}`
                                })
                            })
                            .catch(err => reject(err))
                            */
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
                placeholder: initialValue || '내용을 입력하세요',
                extraPlugins: [uploadPlugin]
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

type TextBoxProps = {
    data: string
}
// show content
export const TextBox: FC<TextBoxProps> = props => {
    return (
        <CKEditor
            editor={CustomEditor}
            disabled={true}
            config={{
                initialData: props.data,
                toolbar: []
            }}
        />
    )
}
