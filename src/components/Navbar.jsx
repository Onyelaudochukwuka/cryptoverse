import React ,{useState} from 'react'
import {  Menu, Typography, Layout, Button } from 'antd';
import { Link } from 'react-router-dom';
import {MoneyCollectOutlined, BulbOutlined, FundOutlined,MenuUnfoldOutlined,MenuFoldOutlined } from '@ant-design/icons';
const Navbar = () => { 
const [state, setState]= useState(false)
  return (
    <div className="nav-container">
<Layout.Header className="flex">
       <div className="logo-container">
                <Typography.Title level={2} className="logo">
                    <Link to="/1">Cryptoverse</Link>
                </Typography.Title>
            </div>
            <input type="checkbox" id="checkbox" checked={state} />
      <label for="checkbox"><Button
        type="primary"
        onClick={()=>setState(!state)}
      >{!state ? <MenuUnfoldOutlined /> : <MenuFoldOutlined/>}</Button></label>
      
      <Menu
        theme="dark"
        // mode="horizontal"
        style={{display:"flex", margin: "auto 0"}}
        defaultSelectedKeys={['Cryptocurrencies']}
        className="menu"
    >
                   
                <Menu.Item icon={<FundOutlined />} key="Cryptocurrencies">
                    <Link to="/cryptocurrencies/1">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined />} key="Exchanges">
                    <Link to="/exchanges">Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />} key="News">
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>
            
    
    </Layout.Header>
           
            {/* <Menu theme="dark" className="flex"> */}
            
    </div>
  )
}

export default Navbar;