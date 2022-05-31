import React from 'react'
import { Typography, Row, Col, Card , Spin, Layout} from 'antd';
import moment from 'moment';
import { useGetExchangesQuery } from '../services/cryptoApi';
const { Text,Title } = Typography;

const Exchanges = () => {
  const { data : cryptoExchanges } = useGetExchangesQuery();
  if(!cryptoExchanges) return  <div className="bg"><Spin size="large" tip="Loading..." style={{left: "50%", position : "relative", margin : "auto"}}/></div>;
  return (
<Layout.Content  style={{
      padding: '0 50px',
      background: "radial-gradient(circle at 48% 25%, var(--bgLeft) 0%, var(--bgCenter) 0%, var(--bgRight) 100%)",
      color: "#fff",
      fontWeight: "700"
    }}>
    <Row gutter={[24, 24]}>
        {cryptoExchanges?.map((data,i)=>(
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card"  style={{backgroundColor:"#21264a",color:"white",textAlign : "center",margin:"0 auto 0 auto", height: "fit-content"}} headStyle={{color:"white",fontWeight:"900",textAlign : "center"}}>
              <a href={data.url} target="_blank" rel="noreferrer" style={{height:"fit-content"}}>
                <div className="news-image-container">
                  <Title className="news-title" level={4} style={{color: "white"}}>{data.name}</Title>
                  <img style={{maxWidth : '200px', maxHeight : '100px'}}src={data.image} alt="news" />
                </div>
                {data.description ? (<p style={{color: "white"}}>{data.description > 100 ? `${data.description.substring(0, 100)} ...` : data.description}</p>) : null}
                <div className="provider-container">
                    <Text style={{color: "white"}}>Estabished {moment([data.year_established]).fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
    </Row>
    </Layout.Content>
      )
}

export default Exchanges;