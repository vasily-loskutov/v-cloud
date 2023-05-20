import styles from "./authPage.module.scss"
import { Button, Form, Input, Typography, Steps, Slider } from 'antd';
import { useRegisterMutation } from "@redux";
import { useActions } from "@hooks";
import { useState } from "react"
import type { SliderMarks } from 'antd/es/slider';

const Registation = () => {
    const [registation, { isError, error, isLoading }] = useRegisterMutation()
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent((prev) => prev + 1);
    };

    const prev = () => {
        setCurrent((prev) => prev - 1);
    };
    const steps = [
        {
            title: 'Давайте познакомимся',

        },
        {
            title: 'Определимся с тарифом',

        },
        {
            title: 'Осталось немного!',

        },
    ];
    const { registration: reg } = useActions()
    type payloadType = {
        email: string,
        name: string,
        password: string,
        totalSize?: number
    }
    const onFinish = async (values: any) => {
        const payload: payloadType = {
            email: values.email,
            name: values.name,
            password: values.password,

        }
        if (values.totalSize === 0) {
            payload.totalSize = 524288000
        } else if (values.totalSize === 20) {
            payload.totalSize = 1073741824
        } else if (values.totalSize === 45) {
            payload.totalSize = 12884901888
        } else if (values.totalSize === 75) {
            payload.totalSize = 34359738368
        } else if (values.totalSize === 100) {
            payload.totalSize = 107374182400
        }

        const result = await registation(payload).unwrap()
        console.log(result)
        reg(result)

    };
    console.log(error)
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const marks: SliderMarks = {
        0: '500мб',
        20: '1гб',
        45: '12гб',
        75: '32гб',
        100: '100гб'
    };
    const onChange = (value: number) => {
        console.log(value)
    }
    return (<div className={styles.registation}>

        <Steps current={current} items={steps} />
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ totalSize: 45 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"

        >

            <div className={current === 0 ? '' : 'hidden'}>
                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

            </div>


            <div className={current === 1 ? '' : 'hidden'}>
                <Form.Item
                    name="totalSize"
                    className={styles.slider_center}

                >
                    <Slider marks={marks} step={null} defaultValue={45} tooltip={{ formatter: null }} onChange={onChange} style={{ width: '600px' }} />
                </Form.Item>
            </div>




            <div className={current === 2 ? '' : 'hidden'}>
                <Typography.Title className={styles.text_center} style={{ marginLeft: '200px' }}>Почти всё готово!</Typography.Title>
                <Typography.Text className={styles.text_center} style={{ marginLeft: '200px', marginBottom: '20px' }}>Осталось только придумать пароль</Typography.Text>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item className={styles.center} style={{ marginLeft: '200px' }}>
                    <Button type="primary" htmlType="submit" loading={isLoading} >
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </div>

            {isError && <Typography.Text type="danger" className={styles.errorText}>{error.data.message}</Typography.Text>}

        </Form>
        <div className={styles.buttonBlock}>
            <Button type="primary" onClick={prev} disabled={current === 0}>Назад</Button>
            <Button type="primary" onClick={next} disabled={current === 2}>Вперёд</Button>
        </div>
    </div>);
}

export default Registation;
