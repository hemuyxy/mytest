import React, { useEffect } from 'react';
import {
    Button,
    Form,
    Input,
    Radio
} from 'antd';
import styles from './index.module.css'
import Content from '../Content';
import { useLocation } from 'react-router-dom';


const UserForm = ({ title }) => {
    const [form] = Form.useForm()
    const handleFinish = (values) => {
        console.log(values);
    }

    const location = useLocation()
    // 渲染当前登录用户信息
    const user = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        if (location.pathname === "/user/edit/[object%20Object]" && user) {
            form.setFieldsValue({
                name: user.uname,
                nickName: user.nickName,
                sex: user.sex,
                role: user.role,
                status: user.status
            })

        }
    }, [user, form])

    return (

        <Content title={title}>
            <Form
                form={form}
                className={styles.form}
                labelCol={{ span: 4, }}
                wrapperCol={{ span: 20, }}
                layout="horizontal"
                onFinish={handleFinish}
            >


                <Form.Item label="账号" name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入账号"
                        }
                    ]}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item label="名称" name="nickName"
                    rules={[
                        {
                            required: true,
                            message: "请输入名称"
                        }
                    ]}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item label="性别" name="sex"
                    rules={[
                        {
                            required: true,
                            message: "请选择性别"
                        }
                    ]}>
                    <Radio.Group>
                        <Radio value="male">男</Radio>
                        <Radio value="female">女</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="密码" name="password">
                    {/*Input.Password 密码加密 */}
                    <Input.Password placeholder="请输入" />
                </Form.Item>
                <Form.Item label="状态" name="status">
                    <Radio.Group>
                        <Radio value="on">启用</Radio>
                        <Radio value="off">禁用</Radio>
                    </Radio.Group>

                </Form.Item>
                <Form.Item label="角色" name="role">
                    <Radio.Group>
                        <Radio value="user">用户</Radio>
                        <Radio value="admin">管理员</Radio>
                    </Radio.Group>

                </Form.Item>



                <Form.Item label=" " colon={false}>
                    {/* htmltype:触发rule规则 */}
                    <Button
                        size='large'
                        type="primary"
                        htmlType="submit"
                        className={styles.btn}
                    >创建</Button>
                </Form.Item>

            </Form>
        </Content>

    );
}
export default UserForm