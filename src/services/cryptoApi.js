import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    'X-RapidAPI-Key': '9742a4362emsh155754582263755p16f285jsncf279c68b4a2'
}
const baseUrl = 'https://coingecko.p.rapidapi.com';

const createRequest = (url) =>({url,headers:cryptoApiHeaders})
export const cryptoApi = createApi({
        reducerPath : 'cryptoApi',
        baseQuery : fetchBaseQuery({ baseUrl }),
        endpoints : (builder)=>({
            getCryptos: builder.query({
                query : (pageId) => createRequest(`/coins/markets?vs_currency=usd&page=${pageId}&per_page=100`),
                keepUnusedDataFor: 5,
                
            }),
            getCryptoDetails : builder.query({
                query : (Id) => createRequest(`/coins/${Id}`),
            }),
            getCryptoHistory : builder.query({
                query : ({ coinId, timePeriod }) => createRequest(`/coins/${coinId}/market_chart?vs_currency=usd&days=${timePeriod}`),
            }),
            getExchanges : builder.query({
                query : () => createRequest(`/exchanges`),
            }),
        })
});
export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery
} = cryptoApi;