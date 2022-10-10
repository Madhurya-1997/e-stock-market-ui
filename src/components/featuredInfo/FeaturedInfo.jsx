import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function FeaturedInfo({ stockMetrics }) {
  const { isLoading, companies } = useSelector(state => state.companies);

  useEffect(() => {
    console.log(stockMetrics)
  }, [])

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Min Stock</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs. {stockMetrics.min}</span>
          <span className="featuredMoneyRate">
            <ArrowUpward className="featuredIcon" />
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Max Stock</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs. {stockMetrics.max}</span>
          <span className="featuredMoneyRate">
            <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Avg Stock</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rs. {stockMetrics.avg}</span>
          <span className="featuredMoneyRate">
            <ArrowUpward className="featuredIcon" />
          </span>
        </div>
      </div>
    </div>
  );
}
