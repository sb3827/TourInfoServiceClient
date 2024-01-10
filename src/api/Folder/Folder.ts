import {folderAll} from './../../data/Folder/Folder'
import {commonAxios} from './../Axios/CommonAxios'

export const ShowFolderAll = async (mno: number): Promise<folderAll> => {
    const response = await commonAxios.get(`/folder/all/${mno}`)
    return response.data
}
