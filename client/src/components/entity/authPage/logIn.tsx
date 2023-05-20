import styles from "./authPage.module.scss"
import { Button, Form, Input, Typography } from 'antd';
import { useLogInMutation } from "@redux";
import { useActions } from "@hooks";



const LogIn = () => {
    const [logIn, { isError, error, isLoading }] = useLogInMutation()

    const { logIn: logInAction } = useActions()
    const onFinish = async (values: any) => {



        const result = await logIn(values).unwrap()

        logInAction(result)

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (<div className={styles.registation}>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

            <Form.Item
                label="E-mail"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>



            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading} >
                    Войти
                </Button>
            </Form.Item>
            {isError && <Typography.Text type="danger" className={styles.errorText}> {error.data.message}</Typography.Text>}

        </Form>
    </div>);
}

export default LogIn;
