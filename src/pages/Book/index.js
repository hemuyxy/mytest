import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Form, Input, Select, Space, Table, Tooltip, message, Modal } from "antd"
import LazyLoad from 'react-lazyload';
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './index.module.css'
import dayjs from "dayjs";
import Content from "@/apis/Content";


const COLUMNS = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 200
    },
    {
        title: '封面',
        dataIndex: 'cover',
        key: 'cover',
        width: 120,
        render: (text) => {
            return <LazyLoad once={true}>
                <img width={50}
                    src={text} />
            </LazyLoad>
        }
    },
    {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
        width: 120
    },
    {
        title: '分类',
        dataIndex: 'category',
        key: 'category',
        width: 80
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
        width: 200,
        render: (text) => {
            return <Tooltip title={text} placement="topleft">
                {text}
            </Tooltip>
        }
    },
    {
        title: '库存',
        dataIndex: 'stock',
        key: 'stock',
        width: 80
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 120,
        render: (text) => dayjs(text).format('YYYY-MM-DD')
    },
];

const BOOK = [{
    id: 1,
    name: 'React入门',
    cover: 'book1.bmp',
    author: 'John Doe',
    category: '前端',
    description: 'React入门是一本非常好的书籍,可以帮助初学者快速掌握React。',
    stock: 10,
},
{
    id: 2,
    name: 'JavaScript高级程序设计',
    cover: 'book2.bmp',
    author: 'Nicholas C. Zakas',
    category: '前端',
    description: 'JavaScript高级程序设计是一本非常全面的JavaScript书籍,适合有一定基础的读者。',
    stock: 5,
},
{
    id: 3,
    name: '深入理解计算机系统',
    cover: 'book3.bmp',
    author: 'Randal E. Bryant',
    category: '计算机',
    description: '深入理解计算机系统是一本非常深入浅出的计算机科学书籍，适合对计算机科学感兴趣的读者。',
    stock: 8,
}
]

const Book = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [bookList, setBookList] = useState(BOOK)
    // 获取新增的书籍列表
    useEffect(() => {
        // 更新
        const updataList = localStorage.getItem('updataList')
        if (updataList) {
            const updataBooks = JSON.parse(updataList)
            const newList = bookList.filter(book => {
                return (book.id !== Number(updataBooks.id))
            }
            )
            newList.push(updataBooks)
            console.log(newList);
            // 新增
            const bookAddList = JSON.parse(localStorage.getItem('newbookList'))
            newList.push(bookAddList)
            setBookList(newList);
        }

        // const newBookList = newList.concat(JSON.parse(bookAddList))
        //     setBookList(newBookList);
        // }
        // localStorage.removeItem('updataList,newbookList')

    }, [])


    // 编辑
    const BookEdit = (book) => {

        navigate(`/book/edit/${book.id}`, { state: { book } })

    }
    // 搜索
    const handleSearchFinish = () => {

        const formData = form.getFieldsValue();
        const { name, author, category } = formData;
        // 根据搜索条件过滤书籍列表
        const filteredBooks = bookList.filter(book => {
            return (
                (name === '' || book.name.toLowerCase().includes(name.toLowerCase())) &&
                (author === '' || book.author.toLowerCase().includes(author.toLowerCase())) &&
                (category === '' || book.category === category)
            );
        });
        setBookList(filteredBooks);
    }
    // 清空
    const handleSearchReset = () => {
        form.resetFields()
    }

    // 删除
    const handleBookDelete = (value) => {
        Modal.confirm({
            title: "确认删除？",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                const updatedBookList = bookList.filter(book =>
                    book.id !== value
                )
                setBookList(updatedBookList);
                message.success("删除成功")
            }
        })
    }
    const user = JSON.parse(localStorage.getItem('user'))

    let columns = [...COLUMNS]
    if (user && user.role === 'admin') {
        columns = [
            ...COLUMNS,
            {
                title: '操作', key: "action", render: (book) => {
                    return <Space>
                        <Button type="link"
                            onClick={() => { BookEdit(book) }}
                        >编辑</Button>
                        <Button type="link" danger
                            onClick={() => handleBookDelete(book.id)}
                        >删除</Button>
                    </Space>
                }
            }
        ]
    }
    return (
        <Content title={"图书列表"}>
            <Form
                name="search"
                form={form}
                layout="inline"
                // onFinish={handleSearchFinish}
                initialValues={{
                    name: '', author: '', Category: ''
                }}
            >
                <Row gutter={24}>
                    <Col span={7}>
                        <Form.Item name="name" label="名称" >
                            <Input placeholder="请输入" allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item name="author" label="作者" >
                            <Input placeholder="请输入" allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="category" label="分类" >
                            <Select
                                allowClear
                                showSearch

                                placeholder="请选择"
                                options={[
                                    { title: '前端', value: '前端' },
                                    { title: '后端', value: '后端' },
                                    { title: '计算机', value: '计算机' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" onClick={handleSearchFinish}>
                                    搜索
                                </Button>
                                <Button htmlType="submit"
                                    onClick={handleSearchReset}
                                >
                                    清空
                                </Button>

                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <div className={styles.tableWrap}>
                <Table
                    dataSource={bookList}
                    columns={columns}
                    scroll={{ x: 1000 }}

                // onChange={tableChange}
                // pagination={{ ...pagination, showTotal: () => `共${pagination.total}条` }}
                />

            </div>

        </Content >
    )
}

export default Book