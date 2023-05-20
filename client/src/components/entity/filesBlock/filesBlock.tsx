
import FileItem from "../filesBlock/fileItem";
import styles from "./fileBlock.module.scss"
import { FC, useEffect, useState } from "react";
import Selecto from "react-selecto"
import { Button, Empty, Pagination } from "antd";
import type { PaginationProps } from 'antd';
import { useAppSelector } from "@/hooks";
export type FileSelectType = "select" | "unselect";
import { useDeleteFilesInFileListMutation, useRemoveFromTrashMutation, useEmptyTrashMutation } from "@redux"
import { IFile } from "@/models";
import { getFileNames, pagination } from "@/utils";

type propTypes = {
    files: IFile[],
    isTrash: boolean

}

const FilesBlock: FC<propTypes> = ({ files, isTrash }) => {


    const [deleteFileInFileList] = useDeleteFilesInFileListMutation()
    const [removeFromTrash] = useRemoveFromTrashMutation()
    const [emptyTrashMutation] = useEmptyTrashMutation()
    const { user } = useAppSelector(state => state.user)
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const onFileSelect = (id: number, type: FileSelectType) => {


        if (type === "select") {
            setSelectedIds((prev) => [...prev, id]);
        } else {
            setSelectedIds((prev) => prev.filter((id) => id !== id));
        }
    };



    const moveToTrash = () => {

        const payload = {
            id: user?.id,
            fileIds: selectedIds

        }
        deleteFileInFileList(payload)


    }
    const deleteInTrash = () => {
        const payload = {
            id: user?.id,
            fileIds: selectedIds

        }
        removeFromTrash(payload)

    }

    const emptyTrash = async () => {
        const payload = {
            id: user?.id,
            fileNames: getFileNames(files)
        }
        emptyTrashMutation(payload)
    }
    const [current, setCurrent] = useState(1);
    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };



    const [dataCrop, setDataCrop] = useState(files)
    useEffect(() => {
        if (dataCrop.length === 0) {
            setCurrent(1)
        }
    }, [dataCrop])
    useEffect(() => {
        setDataCrop(pagination(30, current, files))
    }, [current, files])



    return (
        <div className={styles.filesBlock}>



            {isTrash ?
                <div >
                    <Button type="primary" danger disabled={selectedIds.length <= 0} onClick={deleteInTrash}> Удалить из корзины</Button>
                    <Button type="primary" onClick={emptyTrash} disabled={files.length <= 0} style={{ marginLeft: "30px" }}>Очистить корзину</Button>
                </div>
                : <Button type="primary" danger disabled={selectedIds.length <= 0} onClick={moveToTrash}> В корзину</Button>}




            <div className={styles.block}>

                {files.length > 0 ?
                    dataCrop.map((file: IFile) => {
                        return <FileItem file={file} key={file.id} />
                    }) : <Empty className={styles.empty} />

                }

                < Selecto

                    selectableTargets={['.item']}
                    selectByClick

                    hitRate={10}
                    selectFromInside
                    toggleContinueSelect={['shift']}
                    continueSelect={false}
                    onSelect={(e) => {
                        e.added.forEach((el) => {
                            el.classList.add("active");
                            onFileSelect(+el.dataset["id"], "select");
                        });
                        e.removed.forEach((el) => {
                            el.classList.remove("active");
                            onFileSelect(+el.dataset["id"], "unselect");
                        });
                    }}
                />
            </div >

            {files.length > 30 && (
                <div className={styles.pagination}>

                    <Pagination defaultCurrent={1} pageSize={30} total={files.length} onChange={onChange} />
                </div>
            )}
        </div>);
}

export default FilesBlock;
