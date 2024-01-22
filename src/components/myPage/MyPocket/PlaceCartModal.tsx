import {
    faCartPlus,
    faPlus,
    faPen,
    faMinus,
    faCheck
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {FC, useEffect, useState} from 'react'
import {
    ShowFolderAll,
    appendCart,
    deleteFolder,
    registerFolder,
    updateFolder
} from '../../../api'
import {RootState} from '../../../store/rootReducer'
import {useSelector} from 'react-redux'
import {
    folderAll,
    registerFolderData,
    updateFolderData
} from '../../../data/Folder/Folder'
import { useDispatch } from 'react-redux'
import { ReportModal } from '../../manager/ReportList/ReportModal'

type Pno = {
    pno: number
    onCloseModal:()=>void
}

export const PlaceCartModal: FC<Pno> = ({pno,onCloseModal}) => {
    const user = useSelector((state: RootState) => state.login.mno)!

    const [folderData, setFolderData] = useState<folderAll | null>(null)
    const [folderTitle, setFolderTitle] = useState<string>('')
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false)
    const [editingFolder, setEditingFolder] = useState<number>(0)

    const newFolderData: registerFolderData = {
        mno: user,
        title: 'NewFolder'
    }

    const updateFolderData: updateFolderData = {
        fno: editingFolder,
        mno: user,
        title: folderTitle
    }



    const selectFolder = (fno: number) => {
        setEditingFolder(fno)
    }

    const confirmUpdate = () => {
        folderUpdate()
        setEditingFolder(0)
    }

    async function fetchData() {
        try {
            const data = await ShowFolderAll(user)
            setFolderData(data)
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    async function folderRegister() {
        try {
            const data2 = await registerFolder(newFolderData)
            setRefreshFlag(!refreshFlag) // 상태 변경 부분
        } catch (error) {
            console.log(error)
        }
    }

    async function folderUpdate() {
        try {
            const data3 = await updateFolder(updateFolderData)
            setRefreshFlag(!refreshFlag) // 상태 변경 부분
        } catch (error) {
            console.log(error)
        }
    }

    async function folderDelete(fno: number) {
        try {
            const data4 = await deleteFolder(fno)
            setRefreshFlag(!refreshFlag) // 상태 변경 부분
        } catch (error) {
            console.log(error)
        }
    }

    async function folderSelect(fno: number) {
        try {
            const data4 = await appendCart({
                mno: user,
                fno: fno,
                pno: pno
            })
            alert('등록되었습니다.')
            setRefreshFlag(!refreshFlag) // 상태 변경 부분
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [refreshFlag])


    return (
        // FIX ReportModal 명 수정예정
        <ReportModal onClose={onCloseModal} isOpen>
                    <h3 className="text-4xl">모든 장바구니</h3>
                    <h3 className="text-xl">
                        어느 바구니에 넣을지 선택하세요!
                        {folderData && (
                            <label className="btn btn-ghost" onClick={folderRegister}>
                                <FontAwesomeIcon icon={faPlus} className="m-1 text-xl" />
                            </label>
                        )}
                    </h3>

                    {folderData?.data.map(folder => (
                        <div className="w-full h-16 border-2 rounded-lg" key={folder.fno}>
                            <div>
                                {editingFolder === folder.fno ? (
                                    <>
                                        <input
                                            className="w-64 mt-2 mr-2 text-2xl input input-bordered"
                                            placeholder="Type here"
                                            type="text"
                                            value={folderTitle}
                                            onChange={e => setFolderTitle(e.target.value)}
                                        />
                                        <label
                                            className="btn btn-ghost"
                                            onClick={confirmUpdate}>
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="text-lg"
                                            />
                                        </label>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-2xl ">
                                            <label
                                                className="text-2xl btn btn-ghost "
                                                onClick={() => folderSelect(folder.fno)}>
                                                {folder.title}
                                            </label>
                                            <label
                                                className="btn btn-ghost"
                                                onClick={() => selectFolder(folder.fno)}>
                                                <FontAwesomeIcon
                                                    icon={faPen}
                                                    className="text-lg"
                                                />
                                            </label>
                                            <label
                                                className="btn btn-ghost "
                                                onClick={() => folderDelete(folder.fno)}>
                                                <FontAwesomeIcon
                                                    icon={faMinus}
                                                    className="text-lg"
                                                />
                                            </label>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    </ReportModal>
    )
}
