import { Link, useParams } from "react-router-dom";
import "./company.css";
import { Publish, DeleteOutline } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import { getCompany } from "../../actions/companies";
import Loader from "../../components/loader/Loader";
import StocksWidget from "../../components/widgets/StocksWidget";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCompanyStocksWithinTimeSpan } from "../../actions/stocks";
import DialogStockMetrics from "../../components/dialog/DialogStockMetrics";

export default function Company() {

    const [timeSpan, setTimeSpan] = useState({
        startDate: '',
        endDate: ''
    })
    const [stockMetrics, setStockMetrics] = useState({
        min: '',
        max: '',
        avg: ''
    })
    const [open, setOpen] = useState(false)

    const { code } = useParams();
    const { isLoading, companyDetails } = useSelector((state) => state.companies);
    const { isStocksLoading, stocks, stocksError } = useSelector((state) => state.stocks);

    const dispatch = useDispatch();

    let data = null;

    if (!isLoading) {
        data = companyDetails.stocks;
    }

    useEffect(() => {
        if (!isLoading) {
            dispatch(getCompany(code));
            data = companyDetails.stocks;
        }
    }, [])

    useEffect(() => {
        if (stocks.length === 0) return;
        if (!isStocksLoading && stocks.length === 0) {
            toast.warn("No Stocks Available within time span !!", { position: toast.POSITION.BOTTOM_LEFT })
            return;
        }

        if (!isStocksLoading && timeSpan.startDate !== '' && timeSpan.endDate !== '') {
            populateStockMetrics(stocks)
            setOpen(true);
        }
    }, [isStocksLoading, stocks])


    const populateStockMetrics = stockList => {
        let minStock = Number.MAX_VALUE;
        let maxStock = Number.MIN_VALUE;
        let avgStock = 0;
        stockList.forEach(stock => {
            if (stock.stockPrice < minStock) {
                minStock = stock.stockPrice
            }
            if (stock.stockPrice > maxStock) {
                maxStock = stock.stockPrice
            }
            avgStock = avgStock + (stock.stockPrice / stockList.length)
        })
        setStockMetrics({
            min: minStock.toString(),
            max: maxStock.toString(),
            avg: avgStock.toFixed(2)
        })
    }
    const paddingDate = num => num < 10 ? '0' + num : num

    const formatDate = inputDate => {
        let date = new Date(inputDate);
        return [paddingDate(date.getDate()), paddingDate(date.getMonth() + 1), date.getFullYear()].join('-');
    }

    const fetchStockMetrics = async (code) => {
        const startDate = formatDate(timeSpan.startDate);
        const endDate = formatDate(timeSpan.endDate);
        if (new Date(startDate) > new Date(endDate)) {
            toast.error("Start Date should come before End Date", { position: toast.POSITION.BOTTOM_LEFT })
        } else if (timeSpan.startDate === '' || timeSpan.endDate === '') {
            toast.error("Please enter the Start & End Dates", { position: toast.POSITION.BOTTOM_LEFT })
        } else {
            await dispatch(getCompanyStocksWithinTimeSpan(code, startDate, endDate));

        }


    }


    return (
        <>
            {isLoading ? <Loader /> : (
                <div className="company">
                    <div className="companyTitleContainer">
                        <h1 className="companyTitle">{companyDetails.company.name}</h1>
                        <Link to={`/newstock/${code}`} className="companyAddButtonLink">
                            <button className="companyAddButton">
                                <AddIcon />
                                Add stock
                            </button>
                        </Link>
                    </div>
                    <div className="companyTop">
                        <div className="companyTopLeft">
                            <div className="companyInfoBottom">

                                <div className="companyInfoItem">
                                    <span className="companyInfoKey">Code:</span>
                                    <span className="companyInfoValue">{companyDetails.company.code}</span>
                                </div>
                                <div className="companyInfoItem">
                                    <span className="companyInfoKey">Stocks Enlisted in:</span>
                                    <span className="companyInfoValue">{companyDetails.company.stockExchangeEnlisted}</span>
                                </div>
                                <div className="companyInfoItem">
                                    <span className="companyInfoKey">CEO:</span>
                                    <span className="companyInfoValue">{companyDetails.company.ceo}</span>
                                </div>
                                <div className="companyInfoItem">
                                    <span className="companyInfoKey">Annual Turnover:</span>
                                    <span className="companyInfoValue">Rs. {companyDetails.company.turnover}</span>
                                </div>
                                <div className="companyInfoItem">
                                    <span className="companyInfoKey">Visit us:</span>
                                    <span className="companyInfoValue">{companyDetails.company.website}</span>
                                </div>
                            </div>
                        </div>
                        {data.length > 0 ? (

                            <form className="companyTopRight" onSubmit={e => e.preventDefault()}>
                                <div className="timeControlGroup">
                                    <div className="timeControl">
                                        <label htmlFor="startDate">Start date</label>
                                        <input
                                            type="date"
                                            className="timeSpan"
                                            value={timeSpan.startDate}
                                            onChange={e => setTimeSpan({ ...timeSpan, startDate: e.target.value })} />
                                    </div>
                                    <div className="timeControl">
                                        <label htmlFor="startDate">End date</label>
                                        <input
                                            type="date"
                                            className="timeSpan"
                                            value={timeSpan.endDate}
                                            onChange={e => setTimeSpan({ ...timeSpan, endDate: e.target.value })} />
                                    </div>
                                </div>

                                <button
                                    onClick={() => fetchStockMetrics(code)}
                                    className="timeControl timeSpanButton">
                                    <AddIcon />
                                    Fetch Stocks
                                </button>
                            </form>
                        ) : null}

                        {/* <div className="companyTopRight">
                        </div> */}
                    </div>
                    <div className="companyBottom">

                        {data.length > 0 ? (
                            <StocksWidget stockList={data} />
                        ) : (
                            <h3>No stocks available</h3>
                        )}
                    </div>

                    <ToastContainer />
                    <DialogStockMetrics
                        title="Stock Overview"
                        description="Test description"
                        stockMetrics={stockMetrics}
                        close={() => setOpen(false)}
                        open={open} />
                </div>)
            }
        </>
    )
}
