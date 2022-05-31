import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import millify from 'millify';
import {Col, Row , Typography, Select, Spin, Card, Layout} from 'antd';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
const {Title, Text} = Typography;
const { Option } = Select;
const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState(7);
  const {data, isFetching} = useGetCryptoDetailsQuery(coinId);
  console.log(data,coinId)
  const {data: coinHistory} = useGetCryptoHistoryQuery({ coinId: coinId, timePeriod: timePeriod });
  const cryptoDetails = data;
  console.log(coinHistory);
  const time = ['1min','3min','5min','15min','30min','1hr','3hr','6hr','12hr', '24hr', '7d', '30d', '3m', '1yr', '3yr', 'max'];

  const stats = [
    { title: 'Market Cap Rank', value: cryptoDetails?.market_cap_rank},
    { title: 'Price to USD', value: `$ ${cryptoDetails?.market_data?.current_price?.usd && millify(cryptoDetails?.market_data?.current_price?.usd )}`},
    { title: '24h Volume', value: `$ ${cryptoDetails?.market_data?.total_volume.usd}`},
    { title: 'Market Cap', value: `$ ${cryptoDetails?.market_data?.market_cap?.usd && millify(cryptoDetails?.market_data?.market_cap?.usd)}` },
    { title: 'ATH', value: `$ ${cryptoDetails?.market_data?.ath?.usd}`},
  ];


  if(isFetching) return   <div className="bg"><Spin size="large" tip="Loading..." style={{left: "50%", position : "relative", margin : "auto"}}/></div>;;
  return (  
    <Layout.Content  style={{
      padding: '0 50px',
      background: "radial-gradient(circle at 48% 25%, var(--bgLeft) 0%, var(--bgCenter) 0%, var(--bgRight) 100%)",
      color: "#fff",
      fontWeight: "700"
    }}>
        <Col className="coin-detail-container">
          <Col className="coin-heading-container">
            <Title level={2} className="coin-name">
              {cryptoDetails?.name}({cryptoDetails?.symbol}) Price
            </Title>
            <Col className="stats-container">
              <Col className="coin-value-statistics">
                <Col className="coin-value-statistics-heading">
                  <Title level={3} className="coin-details-heading">
                    {cryptoDetails.name} Value Statistics
                  </Title>
                  <p>
                    An overview showing he stats of {cryptoDetails.name}
                  </p>
                </Col>
  
              </Col>
              
              </Col>
            <div className="site-card-wrapper" >

                <Row gutter={[32,32]} align="middle" style={{
                  width : "fit-content",
                  margin:"20px auto 30px auto",
                  display: "flex",
                  gap : "0px"
                }}
                >
                {stats.map(({title, value}) => (
                  <Col>
            <Card title={title} bordered={false} style={{backgroundColor:"#21264a",color:"white", width:"200px",textAlign : "center",margin:"0 auto 0 auto"}} headStyle={{color:"white",fontWeight:"900",textAlign : "center"}}>
          {value}
            </Card>
      </Col>
                ))} 
                </Row>
                </div>
            <p>
              {cryptoDetails.name} live price in US dollars.
              View value statistics, market cap and supply.
            </p>
            <Select 
            defaultValue="7d"
            className="select-timeperiod" 
            placeholer="Select Time Period" 
            onChange={(value)=>{
              switch(value){
                case '1min':
                    return setTimePeriod(1/1440);
                case '3min':
                    return setTimePeriod(1/480);
                case '5min' :
                  return setTimePeriod(1/288);
                case '15min':
                  return setTimePeriod(1/96);
                case '30min':
                  return setTimePeriod(1/48);
                case '1hr':
                  return setTimePeriod(1/24);
                case '3hr':
                  return setTimePeriod(1/8);
                case '6hr':
                  return setTimePeriod(1/4);
                case '12hr':
                  return setTimePeriod(1/2);
                case '24hr':
                  return setTimePeriod(1);
                case '7d':
                  return setTimePeriod(7);
                case '30d':
                  return setTimePeriod(30);
                case '3m':
                  return setTimePeriod(90);
                case '1yr':
                  return setTimePeriod(365);
                case '3yr':
                  return setTimePeriod(1095);
                case 'max':
                  return setTimePeriod('max');
                default:
                    return setTimePeriod(7);
              }
            }}>
                      {time.map((date)=><Option key={date}>{date}</Option>)}
            </Select>
            <LineChart coinHistory={coinHistory} currentPrice={millify(Number(cryptoDetails?.market_data?.current_price.usd))} coinName={cryptoDetails.name} priceChange={cryptoDetails?.market_data?.price_change_percentage_24h ? cryptoDetails?.market_data?.price_change_percentage_24h : 0} timePeriod={timePeriod}/>
            
            </Col>
          <Col className="coin-desc-link">
            <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
                    What is {cryptoDetails.name} ?<br/>
                    {HTMLReactParser(cryptoDetails.description.en)}
            </Title>
            </Row>
            <Col className="coin-links">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Links
                {cryptoDetails.links.announcement_url.map((link)=>
                   { return  link !== '' ?
                  (<Row className="coin-link" key={link.name}>
                    <Title level={5} className="link-name">
                     {link ? "Announcement Url" : null}
                    </Title>
                    <a href={link.url} target="_blank" rel="noreferrer">
                    {link !== '' ? link : null}
                    </a>
                  </Row>) : null
                  }
                 )}
                 {cryptoDetails.links.blockchain_site.map((link)=>
                   { return  link !== '' ?
                  (<Row className="coin-link" key={link.name}>
                    <Title level={5} className="link-name">
                     {link ? "Blockchain Site" : null}
                    </Title>
                    <a href={link.url} target="_blank" rel="noreferrer">
                    {link !== '' ? link : null}
                    </a>
                  </Row>) : null
                  }
                 )}
                 {cryptoDetails.links.homepage.map((link)=>
                   { return  link !== '' ?
                  (<Row className="coin-link" key={link.name}>
                    <Title level={5} className="link-name">
                     {link ? "Homepage" : null}
                    </Title>
                    <a href={link.url} target="_blank" rel="noreferrer">
                    {link !== '' ? link : null}
                    </a>
                  </Row>) : null
                  }
                 )}
                  {cryptoDetails.links.official_forum_url.map((link)=>
                   { return  link !== '' ?
                  (<Row className="coin-link" key={link.name}>
                    <Title level={5} className="link-name">
                     {link ? "Official Forum Url" : null}
                    </Title>
                    <a href={link.url} target="_blank" rel="noreferrer">
                    {link !== '' ? link : null}
                    </a>
                  </Row>) : null
                  }
                 )}
                  {cryptoDetails.links.repos_url.github.map((link)=>
                   { return  link !== '' ?
                  (<Row className="coin-link" key={link.name}>
                    <Title level={5} className="link-name">
                     {link ? "Github Repository Url" : null}
                    </Title>
                    <a href={link.url} target="_blank" rel="noreferrer">
                    {link !== '' ? link : null}
                    </a>
                  </Row>) : null
                  }
                 )}
                  { cryptoDetails.links.subreddit_url !== '' ?
                  (<Row className="coin-link" key={cryptoDetails.links.subreddit_url}>
                    <Title level={5} className="link-name">
                     {cryptoDetails.links.subreddit_url ? "Reddit" : null}
                    </Title>
                    <a href={cryptoDetails.links.subreddit_url} target="_blank" rel="noreferrer">
                    {cryptoDetails.links.subreddit_url !== '' ? cryptoDetails.links.subreddit_url : null}
                    </a>
                  </Row>) : null
                  }
                  
              </Title>
            </Col>
          </Col>
        </Col>
        </Layout.Content>
    )
}

export default CryptoDetails;