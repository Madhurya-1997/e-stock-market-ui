import React, { useEffect, useState } from "react";
import "./topbar.css";
// import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { SearchOutlined } from '@material-ui/icons';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCompany } from "../../actions/companies";
import { useHistory } from "react-router-dom";

export default function Topbar() {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { companies, isLoading, error } = useSelector(state => state.companies);

  let codes = companies.map(companyDetail => companyDetail.company.code);

  const goToCompany = async (keyword) => {
    if (!codes.includes(keyword)) {
      toast.error(keyword + " does not exists", { position: toast.POSITION.BOTTOM_LEFT })
    } else {
      await dispatch(getCompany(keyword));
      history.push(`/company/${keyword}`)
    }
  }

  // useEffect(() => {
  //   if (!isLoading && !(typeof (error) === undefined)) {
  //     history.push(`/company/${keyword}`)
  //   }
  // }, [isLoading, error])


  // useEffect(() => {
  //   if (!(typeof (error) === undefined)) {
  //     // toast.error(keyword + " does not exists", { position: toast.POSITION.BOTTOM_LEFT })
  //     history.push(`/company/${keyword}`)
  //   }
  // }, [error])

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft" onClick={() => history.push("/")}>
          <span className="logo">stock market</span>
        </div>
        <div className="topRight">
          <input
            type='text'
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="search"
            placeholder="company code..." />
          <SearchOutlined
            onClick={() => goToCompany(keyword)}
            className="searchBtn" />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
