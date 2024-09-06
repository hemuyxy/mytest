import React from 'react';
import { Button, Row, Col, Form, Select, Space, Tag, Table, message, Modal } from "antd"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './index.module.css'
import dayjs from "dayjs";

import Content from "@/apis/Content";

const COLUMNS = [
    {
        title: "名称",
        dataIndex: "bookName",
        key: "bookName",
        width: 200
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 80,
        render: (text) => {
            return text === 'on' ? <Tag color="red">借出</Tag> : <Tag color='green'>已还</Tag>
        }
    },
    {
        title: '借阅人',
        dataIndex: 'borrowUser',
        key: 'borrowUser',
        width: 80
    },
    {
        title: '借阅时间',
        dataIndex: 'borrowAt',
        key: 'borrowAt',
        width: 120,
        render: (text) => dayjs(text).format('YYYY-MM-DD')
    },
    {
        title: '归还时间',
        dataIndex: 'backAt',
        key: 'backAt',
        width: 120,
        render: (text) => {
            if (!text) {
                return "未归还"
            }
            return dayjs(text).format('YYYY-MM-DD')
        }
    }
];

const STATUS = [
    { label: "借出", value: "on" },
    { label: "归还", value: "off" }
]

const BORROW = [
    { id: '1', bookName: "JavaScript高级程序设计", status: "on", borrowUser: "张三", borrowAt: "2022-01-01", backAt: "" },
    { id: '2', bookName: "JavaScript高级程序设计", status: "off", borrowUser: "张三", borrowAt: "2022-01-01", backAt: "2022-01-10" },
]

const Borrow = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    let columns = [...COLUMNS]
    if (user && user.role === 'admin') {
        columns = [
            ...COLUMNS,
            {
                title: '操作', key: "action", render: (borrow) => {
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
        <Content title={"借阅列表"}>
            <Form
                name="search"
                layout="inline"

            >
                <Row gutter={24}>
                    <Col span={7}>
                        <Form.Item name="name" label="书籍名称" >
                            <Select
                                allowClear
                                showSearch
                                optionFilterProp="label"

                            ></Select>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item name="status" label="状态" >
                            <Select
                                allowClear
                                showSearch
                            ></Select>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item name="user" label="借阅人" >
                            <Select
                                allowClear
                                showSearch

                                placeholder="请选择"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit"
                                >
                                    搜索
                                </Button>
                                <Button htmlType="submit"
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
                    dataSource={BORROW}
                    columns={columns}
                    scroll={{ x: 1000 }}


                />
            </div>

        </Content >
    )
}
export default Borrow