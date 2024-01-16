import { faCartPlus, faPlus, faPen, faMinus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { ShowFolderAll, appendCart, deleteFolder, registerFolder, updateFolder } from "../../../api";
import { RootState } from '../../../store/rootReducer'
import { useSelector } from 'react-redux';
import { deleteFolderData, folderAll, registerFolderData, spotAddData, updateFolderData } from "../../../data/Folder/Folder"

type Pno = {
    pno: number
}

export const PlaceCartModal: FC<Pno> = ({pno}) => {

    const user = useSelector((state: RootState) => state.login.mno)!

    const [folderData, setFolderData] = useState<folderAll | null>(null);
    const [folderTitle, setFolderTitle ] = useState<string>('');
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false); 
    const [editingFolder, setEditingFolder] = useState<number>(0);

    const newFolderData: registerFolderData = {
        mno: user,
        title: 'NewFolder'
    }

     const updateFolderData: updateFolderData = {
        fno: editingFolder,
        mno: user,
        title: folderTitle
    }

    const spotAddData: spotAddData = {
        mno: user,
        fno: editingFolder,
        pno: pno
    }


    const selectFolder = (fno: number) => {
        setEditingFolder(fno);
    }



    const confirmUpdate = () => {
        folderUpdate()
        setEditingFolder(0);
    };

    
    async function fetchData() {
        try {
            const data = await ShowFolderAll(user);
            setFolderData(data);
            console.log(data);

        } catch (err) {
            console.error(err);
        }
    }

    async function folderRegister() {

        try {
            const data2 = await registerFolder(newFolderData)
            setRefreshFlag(prev => !prev); // 상태 변경 부분
        } catch (error) {
            console.log(error);
        }
        
    }

    async function folderUpdate() {

        try {
            const data3 = await updateFolder(updateFolderData)
            setRefreshFlag(prev => !prev); // 상태 변경 부분
        } catch (error) {
            console.log(error);
        }
        
    }

    async function folderDlete(fno: number) {

        try {
            const data4 = await deleteFolder(fno)
            setRefreshFlag(prev => !prev); // 상태 변경 부분
        } catch (error) {
            console.log(error);
        }
        
    }

    async function folderSelect (fno: number) {

        try {
            const data4 = await appendCart({
                mno: user,
                fno: fno,
                pno: pno
            })
            alert('등록되었습니다.')
            setRefreshFlag(prev => !prev); // 상태 변경 부분
        } catch (error) {
            console.log(error);
        }
        
    }

        useEffect(() => {
            fetchData()
        }, [refreshFlag])


    return (
        <>
        <label htmlFor="my_modal_6" className="btn btn-ghost">
            <FontAwesomeIcon icon={faCartPlus} className="m-1 text-2xl" />
        </label>
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
            <div className="modal-box">
                <h3 className="text-4xl">모든 장바구니</h3>
                <h3 className="text-xl">어느 바구니에 넣을지 선택하세요!
                    { folderData && folderData.data.length < 7 ?
                    <label className="btn btn-ghost" onClick={folderRegister}>
                        <FontAwesomeIcon icon={faPlus} className="m-1 text-xl" />
                    </label>
                    : <></>
                    }
                </h3>
                
                {folderData?.data.map((folder) => (
    <div className="w-full h-16 border-2 rounded-lg" key={folder.fno}>
        <div>
            {editingFolder === folder.fno ? (
                <>
                    <input
                        className="w-64 mt-2 mr-2 text-2xl input input-bordered"
                        placeholder="Type here"
                        type="text"
                        value={folderTitle}
                        onChange={(e) => setFolderTitle(e.target.value)}
                    />
                    <label className="btn btn-ghost" onClick={confirmUpdate}>
                        <FontAwesomeIcon icon={faCheck} className="text-lg" />
                    </label>
                </>
            ) : (
                <>
                    <div className="text-2xl ">
                         <label className="text-2xl btn btn-ghost " onClick={() => folderSelect(folder.fno)} >
                        {folder.title}
                        </label>
                        <label className="btn btn-ghost" onClick={() => selectFolder(folder.fno)}>
                            <FontAwesomeIcon icon={faPen} className="text-lg" />
                        </label>
                        <label className="btn btn-ghost " onClick={() => folderDlete(folder.fno)}>
                            <FontAwesomeIcon icon={faMinus} className="text-lg" />
                        </label>
                    </div>
                </>
            )}
        </div>
    </div>
))}
                <div className="modal-action">
                    <label htmlFor="my_modal_6" className="btn">Close!</label>
                </div>
            </div>
        </div></>
    )
}