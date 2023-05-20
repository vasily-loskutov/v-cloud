import type { MenuProps } from 'antd';
import { FilesBlock, Rigth } from "@entity"
import { useState } from "react"
import { useAppSelector } from "@/hooks";
import { Spin, Select } from "antd"
import { FileOutlined, DeleteOutlined, FileImageOutlined, FilePdfOutlined, PlayCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { filteredData, isDoc, isImage, isVideo, sortFileByExt } from "@utils";
import { useGetDeleteFilesQuery, useGetFilesQuery } from "@redux"
import { IFile } from "@models";
import styles from "./dashboard.module.scss"
type MenuItem = Required<MenuProps>['items'][number];
const DashBoard = () => {
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }
    const { user } = useAppSelector(state => state.user)


    const [activeKey, setActiveKey] = useState<string>('files')
    const { data, isLoading } = useGetFilesQuery(user.id)
    const { data: deleteFiles } = useGetDeleteFilesQuery(user.id)
    const items: MenuProps['items'] = [
        getItem('Все файлы', 'files', <FileOutlined />),
        getItem('Фото', 'photos', <FileImageOutlined />),
        getItem('Документы', 'documents', <FilePdfOutlined />),
        getItem('Видео', 'video', <PlayCircleOutlined />),
        getItem('Корзина', 'trash', <DeleteOutlined />)
    ];
    const onClick: MenuProps['onClick'] = (e) => {
        setActiveKey(e.key)
    };
    const [select, setSelect] = useState('new')
    const selectItems = [
        { value: 'new', label: 'С начала новые' },
        { value: 'old', label: 'С начала старые ' },
        { value: 'heavyweight', label: 'С начала более тяжелые' },
        { value: 'ligthweight', label: 'С начала более лёгкие' },

    ]

    const handleChange = (value: string) => {
        setSelect(value)
    }
    const newData = filteredData(data, select)



    return (
        <>
            <Rigth onClick={onClick} items={items} />
            {
                !isLoading ?
                    <div className={styles.dashboard}>
                        <Select
                            defaultValue="С начала новые"
                            style={{ width: "200px" }}
                            className={styles.select}
                            options={selectItems}
                            onChange={handleChange}
                            disabled={data?.length <= 2}
                        />

                        {activeKey === 'files' && <FilesBlock files={newData || []} isTrash={false} />}
                        {activeKey === 'photos' && <FilesBlock files={sortFileByExt(newData, 'photos') || []} isTrash={false} />}
                        {activeKey === 'documents' && <FilesBlock files={sortFileByExt(newData, 'documents') || []} isTrash={false} />}
                        {activeKey === 'trash' && <FilesBlock files={filteredData(deleteFiles, select) || []} isTrash={true} />}
                        {activeKey === 'video' && <FilesBlock files={sortFileByExt(newData, 'video') || []} isTrash={false} />}
                    </div>
                    : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} className='spin' />
            }
        </>
    );
}

export default DashBoard;
