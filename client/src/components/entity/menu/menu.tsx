import { Menu } from "antd";
import type { MenuProps } from 'antd';

import { FC } from "react";

import styles from "./menu.module.scss"

import { UploadButton } from "@shared";

type propTypes = {
    onClick: MenuProps['onClick'];
    items: MenuProps['items']
}
const Rigth: FC<propTypes> = ({ onClick, items }) => {



    return (
        <div className={styles.rigth}>
            <UploadButton />
            <Menu
                onClick={onClick}

                defaultSelectedKeys={['files']}
                defaultOpenKeys={['files']}
                mode="vertical"
                items={items}
            />
        </div >

    );
}

export default Rigth;
