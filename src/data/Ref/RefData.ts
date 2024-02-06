import {CKEditor} from '@ckeditor/ckeditor5-react'
import {ImageReturnData} from '../Board'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// ref type 정의 current.getSelectedRating()로 값 도출
export type RatingRef = {
    getSelectedRating: () => number | null
    setSelectedRating: (score: number) => void
}

export type EditorRef = {
    getImages: ImageReturnData[] | null
    getEditor: () => CKEditor<ClassicEditor> | null
}
