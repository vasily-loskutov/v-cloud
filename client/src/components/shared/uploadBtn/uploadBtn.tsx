import { Button, Upload, UploadFile, notification } from "antd";

import styles from "./uploadBtn.module.scss"
import { CloudUploadOutlined } from '@ant-design/icons';

import React from "react";
import { useSaveFileMutation } from "@redux";


import { useAppSelector } from "@hooks";
import { IError } from "@/models";
const UploadButton = () => {
    const { user } = useAppSelector(state => state.user)


    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [saveFile] = useSaveFileMutation()


    const onUploadSuccess = async (options: any) => {
        try {
            const { file } = options
            const payload = new FormData()

            payload.append('file', file)

            const res = await saveFile({ payload: payload, id: user?.id }).unwrap()

            console.log(res)
            notification.success({
                message: "Успешно!",
                description: "файл загружен успешно",
                duration: 2,
            });
            setFileList([]);


        } catch (err) {

            notification.error({
                message: "Ошибка!",
                description: err.data.message,
                duration: 2,
            });

            setFileList([]);
        }
    };
    return (
        <Upload customRequest={onUploadSuccess}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)} className={styles.uploadBtn}>
            <Button icon={<CloudUploadOutlined />} type="primary" size="middle" >Загрузить файл</Button>
        </Upload>
    );
}

export default UploadButton;
