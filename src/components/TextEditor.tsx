import type {FC} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import * as dotenv from 'dotenv'

dotenv.config()

interface TextEditorProps {
  initialValue?: string
  width: number
  height: number
}

export const TextEditor: FC<TextEditorProps> = ({initialValue, width, height}) => {
  return (
    <Editor
      apiKey={process.env.TINY_MCE_API_KEY} //Environment Variable(.env)
      init={{
        resize: false,
        width: width,
        height: height,
        plugins:
          'ai mentions autolink charmap emoticons image link lists searchreplace table visualblocks checklist mediaembed casechange formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          {value: 'First.Name', title: 'First Name'},
          {value: 'Email', title: 'Email'}
        ],
        ai_request: (request: any, respondWith: any) =>
          respondWith.string(() => Promise.reject('See docs to implement AI Assistant'))
      }}
      initialValue={initialValue}
    />
  )
}
