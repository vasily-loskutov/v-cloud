
import { cropFileName, isDoc, isImage, isVideo } from "@utils";
import React, { FC } from "react";
import { Player } from "@shared";

import { Typography } from "antd";
import { FileUnknownOutlined, FilePdfOutlined } from "@ant-design/icons"
import { useLazyDownloadFileQuery } from "@redux"
import { IFile } from "@/models";
type propTypes = {
    file: IFile
}
const FileItem: FC<propTypes> = ({ file }) => {


    const [downloadFileQuery] = useLazyDownloadFileQuery()
    const downloadFile = async (e: React.MouseEvent<HTMLDivElement>) => {

        e.stopPropagation()
        const response = await downloadFileQuery(file.id)
        const downloadUrl = response.data
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name;
        document.body.appendChild(link)
        link.click()
        link.remove()

    }

    return (

        <div className="item" onDoubleClick={(e: React.MouseEvent<HTMLDivElement>) => downloadFile(e)} data-id={file.id} >
            {
                isImage(file.ext) ?
                    <img src={`http://localhost:3001/${file.name}`} style={{ width: '70px', height: '70px' }} /> :
                    isVideo(file.ext) ? <Player fileName={file.name} />
                        :
                        isDoc(file.ext) ? <FilePdfOutlined style={{ fontSize: "70px" }} /> :
                            <FileUnknownOutlined style={{ fontSize: "70px" }} />
            }
            <Typography.Text className="text">{cropFileName(file.name)}</Typography.Text>
        </div>);
}

export default FileItem;
