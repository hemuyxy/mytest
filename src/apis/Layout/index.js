import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import styles from './index.module.css'
import { DownOutlined } from '@ant-design/icons';
import { Layout as AntdLayout, Menu, Dropdown, Space, message, Switch, ConfigProvider } from 'antd';



const { Header, Content, Sider } = AntdLayout;


const ITEMS = [
    {
        key: "/book",
        label: "图书管理",
        children: [
            { key: "/book", label: "图书列表" },
            { key: "/book/add", label: "图书添加 " }]

    },
    {
        key: "/borrow",
        label: "借阅管理",
        children: [
            { key: "/borrow", label: "借阅列表" },
            { key: "/borrow/add", label: "借阅添加" }]

    },

    {
        key: "/user",
        label: "用户管理",
        children: [
            { key: "/user", label: "用户列表" },
            { key: "/user/add", label: "用户添加" }]

    }
]






const Layout = () => {



    const navigate = useNavigate()
    const onMenuClick = (route) => {
        const path = route.key
        navigate(path)
    }

    const user = JSON.parse(localStorage.getItem('user'))
    const filteredItems = ITEMS.filter((item) => {
        if (user && user.role === 'admin') {
            // 管理员可以看到所有页面
            return true;
        } else if (!user || user.role === 'user') {
            // 普通用户只能看到图书列表和借阅列表
            if (item.key === '/book' || item.key === '/category') {
                return {
                    ...item,
                    children: item.children.filter(child => child.key === "/book" || child.key === "/category")
                };
            }
            return false;
        }
    });

    const USER_ITEMS = [
        {
            label:
                <span
                    onClick={(id) => {
                        if (user) {
                            navigate(`/user/edit/${id}`);
                        } else {
                            navigate('/login');
                        }
                    }}>
                    个人中心</span>,
            key: '0'
        },
        {
            label: <span onClick={() => {
                message.success("登出成功")
                localStorage.removeItem('user')
                navigate('/login')
            }}>登出</span>,
            key: '1'
        }
    ];
    // 获取当前url
    const { pathname } = useLocation()
    const activeName = pathname




    return (

        <ConfigProvider >

            <AntdLayout >
                <Header className={styles.header}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div >
                        <img
                            src="/logo1.bmp"
                            alt=''
                            width={40}
                            height={40}
                            className={styles.logo} />
                        图书管理系统

                        <span className={styles.user}>
                            <Dropdown menu={{ items: USER_ITEMS }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        {user ? user.uname : "用户名"}
                                        <DownOutlined />
                                    </Space>

                                </a>
                            </Dropdown>

                        </span>
                    </div>

                </Header>
                <AntdLayout className={styles.sectionInner} >
                    <Sider width={200} >
                        <Menu
                            mode="inline"
                            // 导航栏路由跳转
                            defaultSelectedKeys={[activeName]}
                            defaultOpenKeys={["book"]}
                            selectedKeys={[activeName]}

                            style={{
                                height: '100%',
                                borderRight: 0,
                            }}
                            items={filteredItems}
                            onClick={onMenuClick}

                        />
                    </Sider>
                    <AntdLayout className={styles.sectionContent}>
                        <Content className={styles.content}>

                            <Outlet />

                        </Content>
                    </AntdLayout>
                </AntdLayout>

            </AntdLayout>


        </ConfigProvider >



    )
}
export default Layout