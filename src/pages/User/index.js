
import { Button, Row, Col, Tag, Form, Input, Select, Space, message, Modal, Table } from "antd"
import styles from './index.module.css'
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Content from "@/apis/Content";


const STATUS = {
    ON: 'on',
    OFF: 'off'
}

export const STATUS_OPTIONS = [
    { label: '正常', value: STATUS.ON },
    { label: '禁用', value: STATUS.OFF }
]
const COLUMNS = [
    {
        title: '账号',
        dataIndex: 'name',
        key: 'name',
        width: 200
    },
    {
        title: '用户名称',
        dataIndex: 'nickName',
        key: 'nickName',
        width: 120
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (text) => {
            return text === STATUS.OFF ? <Tag color="red">禁用</Tag> : <Tag color='green'>正常</Tag>
        }
    },

    {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 120,
        render: (text) => dayjs(text).format('YYYY-MM-DD')
    },
];
const USER = [
    {
        id: '1',
        name: 'user',
        nickName: '用户1',
        status: STATUS.ON,
        sex: 'male',
        role: 'user',
        password: '123456',
        createdAt: '2021-01-01'
    },
    {
        id: '2',
        name: 'user1',
        nickName: '用户2',
        status: STATUS.OFF,
        sex: 'male',
        role: 'user',
        password: '123456',
        createdAt: '2021-01-02'
    },

]

const User = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    let columns = [...COLUMNS]
    if (user && user.role === 'admin') {
        columns = [
            ...COLUMNS,
            {
                title: '操作', key: "action", render: (user) => {
                    return <Space>
                        <Button type="link"

                        >编辑</Button>
                        <Button type="link" danger

                        >删除</Button>
                    </Space>
                }
            }
        ]
    }
    return (
        <Content title={"用户列表"}>
            <Form
                name="search"

                layout="inline"

                initialValues={{
                    name: '', status: ''
                }}
            >
                <Row gutter={24}>
                    <Col span={10}>
                        <Form.Item name="name" label="名称" >
                            <Input placeholder="请输入" allowClear />
                        </Form.Item>
                    </Col>

                    <Col span={10}>
                        <Form.Item name="status" label="状态" >
                            <Select
                                allowClear
                                showSearch

                                placeholder="请选择"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    搜索
                                </Button>
                                <Button htmlType="submit">
                                    清空
                                </Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <div className={styles.tableWrap}>
                <Table
                    dataSource={USER}
                    columns={columns}
                    scroll={{ x: 1000 }}

                // onChange={tableChange}
                // pagination={{ ...pagination, showTotal: () => `共${pagination.total}条` }}
                />
            </div>

        </Content >
    )
}
export default User