import { Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
import styles from "./authPage.module.scss"
import Registation from "./registration"
import LogIn from "./logIn"
import { useState } from 'react';

const AuthPage = () => {
    const [active, setActive] = useState<string>("1")
    const onChange = (key: string) => {
        setActive(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Вход`,
            children: <LogIn />,
        },
        {
            key: '2',
            label: `Регистрация`,
            children: <Registation />,
        },

    ];
    return (<div className={styles.center}>
        <div className={styles.card} >

            <Tabs defaultActiveKey="1" activeKey={active} items={items} onChange={onChange} />
            {active === '1' ?
                <Typography.Text className={styles.link}>Вы не зарегестрированы?
                    <Typography.Link onClick={() => setActive('2')}> Зарегистрироваться</Typography.Link>
                </Typography.Text>
                : <Typography.Text className={styles.link}>У вас уже есть аккаунт?
                    <Typography.Link onClick={() => setActive('1')}> Войти</Typography.Link>
                </Typography.Text>}
        </div>
    </div>);
}

export default AuthPage;
