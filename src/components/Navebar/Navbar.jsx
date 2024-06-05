import React, { useState } from 'react';
import { AppstoreOutlined, ShopOutlined, UsergroupAddOutlined, UserAddOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Button, Menu, Layout } from 'antd';
const { Sider, Header } = Layout;

const items = [
  {
    key: 'sub1',
    label: 'Dashboard',
    icon: <AppstoreOutlined />,
  },
  {
    key: 'sub2',
    label: 'Organization',
    icon: <ShopOutlined />,
    children: [
      {
        key: '1',
        label: 'Create Organization',
      },
      {
        key: '2',
        label: 'Show Organization',
      },
    ],
  },
  {
    key: 'sub3',
    label: 'Admin',
    icon: <UsergroupAddOutlined />,
    children: [
      {
        key: '5',
        label: 'Create Admin',
      },
      {
        key: '6',
        label: 'Show Admin',
      },
    ],
  },
  {
    key: 'sub15',
    label: 'Signup Request',
    icon: <UserAddOutlined />,
  },
];

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Sider  collapsed={collapsed} onCollapse={toggleCollapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
        >
          {items.map(item => {
            if (item.children) {
              return (
                <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                  {item.children.map(child => (
                    <Menu.Item key={child.key}>{child.label}</Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            }
            return (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      
    </>
  );
};

export default Navbar;
