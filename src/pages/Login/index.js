import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom';

export const userList = [
    {
        id: 1,
        uname: 'admin',
        nickName: '管理员',
        password: '123456',
        sex: 'male',
        status: 'on',
        role: 'admin'
    },
    {
        rpid: 2,
        uname: 'user',
        nickName: '管理员',
        password: '123456',
        sex: 'female',
        status: 'on',
        role: 'user'
    }
]
const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const onFinish = async (formData) => {
        let isLoggedIn = false;
        for (let user of userList) {
            if (user.uname === formData.name && user.password === formData.password) {
                isLoggedIn = true;
                localStorage.setItem('user', JSON.stringify(user));
                break;
            }
        }
        if (isLoggedIn) {
            localStorage.setItem('token', formData.name);
            message.success("登陆成功");
            navigate('/book');
        }
        else {
            message.error("用户名或密码错误");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}> 图书管理系统</h2>
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}

            >
                <Form.Item
                    label="账号"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '请输入账号!',
                        },
                    ]}
                >
                    <Input placeholder='请输入账号' />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码!',
                        },
                    ]}
                >
                    <Input.Password placeholder='请输入密码' />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>记住密码</Checkbox>
                </Form.Item>

                <Form.Item >
                    <Button
                        type="primary"
                        htmlType="submit"
                        size='large'
                        className={styles.btn}>

                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default Login;