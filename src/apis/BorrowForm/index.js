import React from 'react';
import {
    Button,
    Form,
    Select,
} from 'antd';
import styles from './index.module.css'
import Content from '../Content';



const BorrowForm = () => {

    return (

        <Content title="借阅添加">
            <Form
                className={styles.form}
                labelCol={{ span: 4, }}
                wrapperCol={{ span: 20, }}
                layout="horizontal"
            >
                <Form.Item
                    label="书籍名称"
                    name="book"
                    rules={[
                        {
                            required: true,
                            message: "请输入名称"
                        }
                    ]}>
                    <Select
                        placeholder="请选择"
                    >

                    </Select>
                </Form.Item>
                <Form.Item label="借阅用户" name="user"
                    rules={[
                        {
                            required: true,
                            message: "请选择用户"
                        }
                    ]}>
                    <Select
                        placeholder="请选择"
                    >

                    </Select>
                </Form.Item>

                <Form.Item label="书籍库存" name="stock">

                </Form.Item>

                <Form.Item label=" " colon={false}>
                    {/* htmltype:触发rule规则 */}
                    <Button
                        size='large'
                        type="primary"
                        htmlType="submit"
                        className={styles.btn}
                    >
                        创建
                    </Button>
                </Form.Item>

            </Form>
        </Content>

    );
}
export default BorrowForm 