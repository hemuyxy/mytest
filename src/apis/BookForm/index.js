import React, { useEffect, useState } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Image,
    message,
} from 'antd';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styles from './index.module.css'
import dayjs from 'dayjs';
import Content from '../Content';
import LazyLoad from 'react-lazyload';

const { TextArea } = Input;


const BookForm = ({ title }) => {
    // 图片显示
    const [preview, setPreview] = useState("")
    const [form] = Form.useForm()

    const navigate = useNavigate()
    // 拿到当前id
    const params = useParams()
    // 创建
    const handleFinish = (values) => {
        if (values.publishAt) {
            values.publishAt = dayjs(values.publishAt).valueOf()
        }
        const { id } = params
        if (id) {
            values.id = id
            localStorage.setItem("updataList", JSON.stringify(values))
            message.success("更新成功")
            navigate('/book')

        } else {
            values.id = new Date().getTime() + Math.random().toString(36)
            // const storedBookList = JSON.parse(localStorage.getItem('bookList')) || [];
            // const newBookList = [...storedBookList, values];
            localStorage.setItem("newbookList", JSON.stringify(values));
            console.log(localStorage.getItem("newbookList"));

            message.success("创建成功")
            navigate('/book')
        }

    }
    // 获取book状态
    const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.book) {
            const book = location.state.book;
            form.setFieldsValue({
                name: book.name,
                author: book.author,
                category: book.category,
                cover: book.cover,
                stock: book.stock,
                description: book.description,
            })
        }

    }, [form])


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


                <Form.Item label="名称" name="name"
                    rules={[
                        {
                            required: true,
                            message: "请输入名称"
                        }
                    ]}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item label="作者" name="author"
                    rules={[
                        {
                            required: true,
                            message: "请输入作者"
                        }
                    ]}>
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item label="分类" name="category"
                    rules={[
                        {
                            required: true,
                            message: "请选择分类"
                        }
                    ]}>
                    <Select placeholder="请选择"
                        options={[
                            { title: '前端', value: '前端' },
                            { title: '后端', value: '后端' },
                            { title: '计算机', value: '计算机' },
                        ]}>
                    </Select>
                </Form.Item>
                <Form.Item label="封面" name="cover">

                    <Input
                        placeholder="请输入"
                        onChange={(e) => {
                            form.setFieldValue("cover", e.target.value)
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={(e) => {
                            setPreview(form.getFieldValue("cover"))
                        }}>预览</Button>


                </Form.Item>

                {preview && (
                    <Form.Item label="" colon={false}>
                        <LazyLoad once={true}>
                            <img src={preview} width={100} height={100} alt='' />
                        </LazyLoad>

                    </Form.Item>)}

                <Form.Item label="出版日期" name="publishAt">
                    <DatePicker placeholder="请输入" />
                </Form.Item>

                <Form.Item label="库存" name="stock">
                    <InputNumber placeholder="请输入" />
                </Form.Item>
                <Form.Item label="描述" name="description">
                    <TextArea rows={4} placeholder="请输入" />
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

export default BookForm