import axios from 'axios';

const API = axios.create(
    { baseURL: !process.env.NODE_ENV === 'development' ? 'http://localhost:1000/api/v1.0/market' : "http://api-gateway-lb-17127578.ap-south-1.elb.amazonaws.com/api/v1.0/market" }
);


export const fetchCompanies = () => API.get(`/company-service/company/getall`);
export const fetchCompany = code => API.get(`/company-service/company/info/${code}`);
export const createCompany = company => API.post(`/company-service/company/`, company)
export const deleteCompany = code => API.delete(`/company-service/company/delete/${code}`);

export const fetchCompanyStocks = code => API.get(`/stock-service/stock/get/${code}`);
export const fetchCompanyStocksWithinTimeSpan = (code, startDate, endDate) => API.get(`/stock-service/stock/get/${code}/${startDate}/${endDate}`);
export const createStock = (code, stock) => API.post(`/stock-service/stock/add/${code}`, stock);