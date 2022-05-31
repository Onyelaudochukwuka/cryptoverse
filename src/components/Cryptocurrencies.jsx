import React, { useEffect, useState } from 'react'
import millify from 'millify';
import { Link,useParams } from 'react-router-dom/cjs/react-router-dom';
import {Row, Col, Input, Spin, Card } from 'antd';
import {Pagination, PaginationItem } from '@material-ui/lab';
import { useGetCryptosQuery } from '../services/cryptoApi';
const Cryptocurrencies = () => {
  let { pageId } = useParams();
  const {data : cryptosList, isFetching} = useGetCryptosQuery(pageId, {
    pollingInterval: 1,
    refetchOnMountOrArgChange: true,
    skip: false,
    forceRefetch: true,
  });
  const [cryptos, setCryptos] =  useState(cryptosList);
  const [page, setPage] =  useState(pageId);
  const [searchTerm, setSearchTerm] =  useState('');
  useEffect(()=>{
    const filteredData =cryptosList?.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
   
    setCryptos(filteredData);
},[cryptosList, searchTerm]);
  if(cryptos === undefined && !isFetching){
    setCryptos(cryptosList);
  }

  if(isFetching) return  <div className="bg"><Spin size="large" tip="Loading..." style={{left: "50%", position : "relative", margin : "auto"}}/></div>;

  return (
    <div className="bg">
      <div style={{width: "250px", margin:"20px auto 30px auto"}}><Input placeholder="Search Cryptocurrency" onChange={(e)=>setSearchTerm(e.target.value)} style={{backgroundColor:"transparent",color:"white"}}/></div>
   <div style={{backgroundColor: "#06060f",padding:"16px",borderBottom: "2px solid #535359",textAlign : "center",fontWeight:"500"}}> <Row style={{backgroundColor: "#06060f",padding:"20px",borderBottom: "6px solid #535359"}}>
                        <Col span={6} className="crypto-header">Name</Col>
                        <Col span={6}  className="crypto-header">Price</Col>
                        <Col span={6}  className="crypto-header">Market Cap</Col>
                        <Col span={6} className="crypto-header">Volume Change</Col>
                      </Row>
      </div>
            {cryptos?.map((currency)=>(
              <Card className="crypto-card" style={{backgroundColor: "#21264a",padding:"16px",borderBottom: "2px solid #535359",textAlign : "center",fontWeight:"500"}} key={currency.name} hoverable>
                    <Link to={`/crypto/${currency.id}`}>
                      <Row style={{padding:"16px",borderBottom: "2px solid #535359",textAlign : "center",fontWeight:"500"}}>
                        <Col span={6} ><Row gutter={[12,12]} className="Row"><img className="crypto-image" src={currency.image} alt="icon"/><span className="crypto-text crypto-text-header">{currency.name}</span></Row></Col>
                        <Col span={6}  className="crypto-text">${millify(currency.current_price)}</Col>
                        <Col span={6}  className="crypto-text">${millify(currency.market_cap)}</Col>
                        <Col span={6} className="crypto-text"><span style={millify(currency.price_change_percentage_24h,{
  precision: 3, }) > 0 ? {color : '#1dd15a'} : {color : '#ef5959'}}>{!currency.price_change_percentage_24h ? 0 : currency.price_change_percentage_24h }%</span></Col>
                      </Row>
                    </Link>
                    </Card>
            ))}
        <div style={{margin:"20px auto 30px auto", width:"fit-content"}}><Pagination 
        count={50}
        page={Number(page)}
        variant ="outlined"
        color="secondary"
        renderItem={(item)=>(
          <PaginationItem {...item} component={Link} to={`/cryptocurrencies/${String(item.page)}`} style={{
            backgroundColor: "#21264a",color: "white"
          }}/>

        )} />
              <div style={{width: "250px", margin:"20px auto 30px auto"}}><Input placeholder="Goto Page"
         onKeyUp={(e)=> setPage(e.target.value)}
         style={{backgroundColor:"transparent",color:"white",width:"fit-content"}}/></div>
      </div>
    </div>
  )
}

export default Cryptocurrencies;