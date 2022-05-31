import React from 'react';
import millify from 'millify';
import {Typography, Row, Col, Statistic, Spin,Layout,Card} from 'antd';
import { Link } from 'react-router-dom/cjs/react-router-dom'; 
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components'
const {Title} = Typography;
const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  // console.log(data);
  if(isFetching) return    <Spin size="large" tip="Loading..."  style={{left: "50%", position : "relative", margin : "auto"}}/>;
  return (
        <Layout.Content  style={{
          padding: '0 50px',
          background: "radial-gradient(circle at 48% 25%, var(--bgLeft) 0%, var(--bgCenter) 0%, var(--bgRight) 100%)",
          color: "#fff",
          fontWeight: "700"
        }}>
        <Title level={2} className="heading">Global Crypto Stats</Title>
        <Row theme="dark" style={{
            minHeight: "280px",
            padding: "24px",
        }}>
          <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} style={{color:"white"}}/></Col>
          <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} style={{color:"fff"}}/></Col>
          <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} style={{color:"white"}}/></Col>
          <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} style={{color:"white"}}/></Col>
          <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} style={{color:"white"}}/></Col>
        </Row>

  <div className="site-card-wrapper">
    <Row gutter={[32,32]} align="middle">
      <Col lg={{span:8}} sm={{span:12}} >
        <Card title="Total Cryptocurrencies" bordered={false} style={{backgroundColor:"#21264a"}}>
          {globalStats.total}
        </Card>
      </Col>
      <Col lg={{span:8}} sm={{span:12}}>
        <Card title="Total Exchanges" bordered={false} style={{backgroundColor:"#21264a"}}>
          {millify(globalStats.totalExchanges)}
        </Card>
      </Col>
      <Col lg={{span:8}} sm={{span:12}}>
        <Card title="Total Market Cap" bordered={false} style={{backgroundColor:"#21264a"}}>
          {millify(globalStats.totalMarketCap)}
        </Card>
      </Col>
      <Col lg={{span:8}} sm={{span:12}}>
        <Card title="Total 24h Volume" bordered={false} style={{backgroundColor:"#21264a"}}>
          {millify(globalStats.total24hVolume)}
        </Card>
      </Col>
      <Col lg={{span:8}} xs={{span:12 , offset:6}} offset={4}>
        <Card title="Total Markets" bordered={false} style={{backgroundColor:"#21264a"}}>
          {millify(globalStats.totalMarkets)}
        </Card>
      </Col>
    </Row>
  </div>

        {/* <div className="home-heading-container">
          <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
          <Title level={2} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
        </div>
        <Cryptocurrencies simplified/>
        <div className="home-heading-container">
          <Title level={2} className="home-title">Latest Crypo Newss</Title>
          <Title level={2} className="show-more"><Link to="/news">Show More</Link></Title>
        </div>
        <News simplified/> */}
        </Layout.Content>
    )
}

export default Homepage;