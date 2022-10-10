import { useEffect } from "react";
import "./widgetLg.css";

export default function WidgetLg({ stockList }) {
  const hasStockExpired = endDate => new Date() < new Date(endDate)

  const transformedDate = date => new Date(date).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Stocks Overview</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Company</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Creation Date</th>
          <th className="widgetLgTh">Duration</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {stockList.map(stock => (
          <tr className="widgetLgTr">
            <td className="widgetLgUser">{stock.companyCode}</td>
            <td className="widgetLgAmount">Rs. {stock.stockPrice}</td>
            <td className="widgetLgDate">{transformedDate(stock.createdAt)}</td>
            <td className="widgetLgAmount">{stock.stockDuration}</td>
            <td className="widgetLgStatus">
              <Button type={`${hasStockExpired(stock.endDate) ? "Approved" : "Expired"}`} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
