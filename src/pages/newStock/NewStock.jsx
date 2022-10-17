import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { createStock } from "../../actions/stocks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./newStock.css";

export default function NewStock() {
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch()

  const [stock, setStock] = useState({
    price: '',
    duration: '',
    companyCode: pathname.split("/")[2]
  })


  const { isStocksLoading, stocksError } = useSelector(state => state.stocks);

  const [err, setErr] = useState({
    val: false,
    reason: ''
  })

  const addStock = async (e) => {
    e.preventDefault();
    await dispatch(createStock(pathname.split("/")[2], stock, history));

    // if (!err.val) {
    //   console.log(stock);
    //   await dispatch(createStock(pathname.split("/")[2], stock));
    // } else {
    //   // toast.error
    // }
    // if (!isStocksLoading && !(typeof (stocksError) === undefined)) {
    //   history.push(`/company/${pathname.split("/")[2]}`);
    // }
  }

  useEffect(() => {
    console.log(stocksError)
    if (stocksError) {
      if (stocksError.response.data.hasOwnProperty('errors')) {
        toast.error(stocksError.response.data.errors[0], { position: toast.POSITION.BOTTOM_LEFT })
      } else {
        toast.error(stocksError.response.data.message, { position: toast.POSITION.BOTTOM_LEFT });
      }
    }
  }, [stocksError])

  return (
    <div className="newStock">
      <h1 className="newStockTitle">New Stock for {pathname.split("/")[2]}</h1>
      <form className="newStockForm" onSubmit={addStock}>
        <div className="newStockItem">
          <label>Price</label>
          <input
            type="text"
            value={stock.price}
            onChange={e => setStock({ ...stock, price: e.target.value })}
            placeholder="for example, Rs. 10.56" />
        </div>
        <div className="newStockItem">
          <label>Duration</label>
          <input
            type="text"
            value={stock.duration}
            onChange={e => setStock({ ...stock, duration: e.target.value })}
            placeholder="enter duration in days..." />
        </div>
        <div className="newStockItem">
          <label>Company Code</label>
          <input
            type="text"
            value={pathname.split("/")[2]}
            disabled />
        </div>
        <button type="submit" className="newStockButton">Create</button>
      </form>

      <ToastContainer />
    </div>
  );
}
