import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./overview.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../../actions/companies";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

export default function Overview() {

  const { isLoading, error, companies } = useSelector(state => state.companies)

  const [stockMetrics, setStockMetrics] = useState({
    min: '',
    max: '',
    avg: ''
  })

  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    let stocksList = [].concat.apply([], companies
      .filter(companyDetail => companyDetail.stocks[0] !== undefined)
      .map(companyDetail => companyDetail.stocks))

    setStockList(stocksList)

    let minStock = Number.MAX_VALUE;
    let maxStock = Number.MIN_VALUE;
    let avgStock = 0;
    stocksList.forEach(stock => {
      if (stock.stockPrice < minStock) {
        minStock = stock.stockPrice
      }
      if (stock.stockPrice > maxStock) {
        maxStock = stock.stockPrice
      }
      avgStock = avgStock + (stock.stockPrice / stocksList.length)
    })
    setStockMetrics({
      min: minStock.toString(),
      max: maxStock.toString(),
      avg: avgStock.toFixed(2)
    })
  }, [companies])



  let content = null;

  if (!error) {
    content = (
      <div className="home">
        {isLoading ?
          <Loader /> :
          (
            <>
              <FeaturedInfo stockMetrics={stockMetrics} />
              {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User" /> */}
              <div className="homeWidgets">
                <WidgetSm companies={companies} />
                <WidgetLg stockList={stockList} />
              </div>
            </>
          )}

      </div>
    )
  }

  return content;
}
