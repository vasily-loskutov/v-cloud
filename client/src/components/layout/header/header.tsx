import { FC } from "react";
import styles from "./header.module.scss";
import { Layout, Typography, Menu } from "antd"
import { CloudOutlined } from "@ant-design/icons"
import { useLocation, useNavigate } from 'react-router-dom';

const Header: FC = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const selectedMenu = location.pathname;
    return (
        <Layout.Header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.headerLeft}>
                    <CloudOutlined style={{ fontSize: "60px" }} />
                    <Typography.Text strong>V-cloud</Typography.Text>
                </div>
                <div className={styles.root}>

                    <Menu
                        className={styles.topMenu}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[selectedMenu]}
                        onSelect={({ key }) => navigate(key)}
                        items={[
                            { key: "/", label: "Главная" },
                            { key: "/profile", label: "Профиль" },
                        ]}
                    />
                </div>
            </div>
        </Layout.Header>
    );
}

export default Header;
