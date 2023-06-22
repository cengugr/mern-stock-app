import { FileOutlined, PieChartOutlined, UserOutlined , TeamOutlined, DesktopOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import Home from './components/Home'; 
import {Routes,Route, Link} from 'react-router-dom'; 
import Company from './components/Company';
import Product from './components/Product';
import Purchase from './components/Purchase';
import Sale from './components/Sale';
import Stock from './components/Stock';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/"> Home </Link> , '1', <PieChartOutlined />),
  getItem(<Link to="/company"> Company </Link> , '2', <DesktopOutlined />),
  getItem(<Link to="/product"> Product </Link> , '6', <DesktopOutlined />),
  getItem('Sale/Purchase', 'sub1', <UserOutlined />, [
    getItem(<Link to="/purchase"> Purchase </Link>, '3'),
    getItem(<Link to="/sale"> Sale </Link>, '4'),

  ]), 
  getItem(<Link to="/stock"> Stock </Link>, '5', <FileOutlined />), 
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/company" element={<Company />} />  
              <Route path="/product" element={<Product />} />  
              <Route path="/purchase" element={<Purchase />} />  
              <Route path="/sale" element={<Sale />} />  
              <Route path="/stock" element={<Stock />} />  

            </Routes>
          
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
