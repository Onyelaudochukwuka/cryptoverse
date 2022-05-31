import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Exchanges, Homepage, Cryptocurrencies, CryptoDetails, News } from './components';
import { Switch, Link , Route, Redirect} from 'react-router-dom/cjs/react-router-dom';
import './App.css';
const App = () => {
  return (
    <div className="app">
        <div className="navbar">
              <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Switch>
                <Route exact path="/">
                <Redirect to="/cryptocurrencies/1" />
                </Route>
                <Route exact path="/cryptocurrencies/:pageId">
                <Cryptocurrencies />
                </Route>
                <Route exact path="/exchanges">
                  <Exchanges />
                </Route>
                <Route exact path="/crypto/:coinId">
                  <CryptoDetails />
                </Route>
                <Route exact path="/news">
                  <News />
                </Route>
              </Switch>
            </div>
          </Layout> 
        <Layout.Footer theme="dark" className='footer'
      style={{
        textAlign: 'center',backgroundColor : '#001529',color: "white",fontWeight: "700"
      }}
    >
      Designed By Udoka
      <br></br>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
    </Layout.Footer>
            
        </div>
</div>
  )
}

export default App;