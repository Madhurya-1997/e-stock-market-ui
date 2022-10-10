import "./stocksWidget.css";

import React from 'react'
import { DeleteOutline } from "@material-ui/icons";

const StocksWidget = ({ stockList }) => {
    const hasStockExpired = endDate => new Date() < new Date(endDate)

    const transformedDate = date => new Date(date).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })

    // const removeCompany = async (code) => {
    //     await dispatch(deleteCompany(code));
    //     setOpen(false);

    //     await dispatch(getCompanies());
    //     history.push('/');
    //     // if (!isLoading && !(typeof (error) === undefined)) {
    //     //   history.push('/');
    //     // }
    // }


    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };


    return (
        <table className="widgetLgTable">
            <tr className="widgetLgTr">
                <th className="widgetLgTh">Amount</th>
                <th className="widgetLgTh">Created At</th>
                <th className="widgetLgTh">End Date</th>
                <th className="widgetLgTh">Duration</th>
                <th className="widgetLgTh">Status</th>
            </tr>
            {stockList.map(stock => (
                <tr className="widgetLgTr">
                    <td className="widgetLgAmount">Rs. {stock.stockPrice}</td>
                    <td className="widgetLgDate">{transformedDate(stock.createdAt)}</td>
                    <td className="widgetLgDate">{transformedDate(stock.endDate)}</td>
                    <td className="widgetLgAmount">{stock.stockDuration}</td>
                    <td className="widgetLgStatus">
                        <Button type={`${hasStockExpired(stock.endDate) ? "Approved" : "Expired"}`} />
                    </td>
                </tr>
            ))}
        </table>
    )
}

export default StocksWidget