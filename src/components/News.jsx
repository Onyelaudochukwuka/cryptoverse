import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card , Spin, Layout} from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
const { Text,Title } = Typography;
const { Option } = Select;
const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';
const News = () => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data : cryptoNews } = useGetCryptoNewsQuery({ newsCategory : newsCategory,count : 20 });
  console.log(cryptoNews?.value[0]?.image?.thumbnail?.contentUrl);
    const {data } = useGetCryptosQuery(1);
    if(!cryptoNews?.value) return  <div className="bg"><Spin size="large" tip="Loading..." style={{left: "50%", position : "relative", margin : "auto"}}/></div>;
  return (
     <Layout.Content  style={{
      padding: '0 50px',
      background: "radial-gradient(circle at 48% 25%, var(--bgLeft) 0%, var(--bgCenter) 0%, var(--bgRight) 100%)",
      color: "#fff",
      fontWeight: "700"
    }}>
    <Row gutter={[24, 24]}>
        <Col span={24}>
          <Select 
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value)=>setNewsCategory(value)}
                filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="Cryptocurrency">Cryptocurency</Option>
                {data?.map((coin)=> <Option value={coin.name}>{coin.name}</Option>)}
              </Select>
        </Col>
        {cryptoNews.value.map((news,i)=>(
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card" cover={
                  <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />} style={{backgroundColor:"#21264a",color:"white",textAlign : "center",margin:"0 auto 0 auto"}} headStyle={{color:"white",fontWeight:"900",textAlign : "center"}}>
              <a href={news.url} target="_blank" rel="noreferrer">
                  <Title level={4} style={{color: "white"}}>{news.name}</Title>
                <p style={{color: "white"}}>{news.description > 100 ? `${news.description.substring(0, 100)} ...` : news.description}</p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                      <Text className="provider-name" style={{color: "white"}}>{news.provider[0]?.name}</Text>
                  </div>
                    <Text style={{color: "white"}}>{moment(news.datePublished).startOf('ss').fromNow('')}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
    </Row>
    </Layout.Content>
  )
}

export default News;