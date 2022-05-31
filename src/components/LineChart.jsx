
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, priceChange, timePeriod }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.prices?.length; i += 1) {
    coinPrice.push(coinHistory?.prices[i][1]);
  }

  for (let i = 0; i < coinHistory?.prices?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.prices[i][0]).toLocaleDateString());
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#ef5959',
        borderColor: '#ef5050',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change" style={{color: "white"}}>Change: <span style={priceChange > 0 ? {color : '#1dd15a'} : {color : '#ef5959'}}>{priceChange}%</span></Title>
          <Title level={5} className="current-price" style={{color: "white"}}>Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options}/>
    </>
  );
};

export default LineChart;