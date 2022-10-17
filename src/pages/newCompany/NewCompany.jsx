import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCompany } from "../../actions/companies";
import "./newCompany.css";

export default function NewCompany() {
  const [company, setCompany] = useState({
    code: '',
    name: '',
    ceo: '',
    turnover: '',
    website: '',
    stockExchangeEnlisted: 'NSE',
  })


  const { isLoading, error } = useSelector(state => state.companies);

  const [err, setErr] = useState({
    val: false,
    reason: ''
  })

  const dispatch = useDispatch();
  const history = useHistory();

  const addCompany = async (e) => {
    e.preventDefault();

    await dispatch(createCompany(company, history));

    // if (!err.val) {
    //   console.log(company);
    //   await dispatch(createCompany(company));
    // } else {
    //   // toast.error
    // }


    // if (!isLoading && !(typeof (error) === undefined) && !(typeof (error) === 'object')) {
    //   history.push('/');
    // }


  }




  useEffect(() => {
    console.log(error)
    if (error) {
      if (error.response.data.hasOwnProperty('errors')) {
        toast.error(error.response.data.errors[0], { position: toast.POSITION.BOTTOM_LEFT })
      } else {
        toast.error(error.response.data.message, { position: toast.POSITION.BOTTOM_LEFT });
      }
    }
  }, [error])

  return (
    <div className="newCompany">
      <h1 className="addCompanyTitle">Register new Company</h1>
      <form className="addCompanyForm" onSubmit={addCompany}>
        <div className="addCompanyFormGroup">
          <div className="addCompanyItemGroup">
            <div className="addCompanyItem">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={company.name}
                onChange={e => setCompany({ ...company, name: e.target.value })}
                placeholder="enter company name..." />
            </div>
            <div className="addCompanyItem">
              <label htmlFor="code">Code</label>
              <input
                id="code"
                type="text"
                value={company.code}
                onChange={e => setCompany({ ...company, code: e.target.value })}
                placeholder="enter company code..." />
            </div>
            <div className="addCompanyItem">
              <label htmlFor="ceo">CEO</label>
              <input
                id="ceo"
                type="text"
                value={company.ceo}
                onChange={e => setCompany({ ...company, ceo: e.target.value })}
                placeholder="enter company CEO..." />
            </div>
          </div>
          <div className="addCompanyItemGroup">
            <div className="addCompanyItem">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                value={company.website}
                onChange={e => setCompany({ ...company, website: e.target.value })}
                placeholder="enter company website..." />
            </div>
            <div className="addCompanyItem">
              <label htmlFor="turnover">Annual Turonver</label>
              <input
                id="turnover"
                type="text"
                value={company.turnover}
                onChange={e => setCompany({ ...company, turnover: e.target.value })}
                placeholder="enter company's annual turnover..." />
            </div>
            <div className="addCompanyItem">
              <label htmlFor="enlistedAt">Stocks Enlisted At</label>
              <select
                id="enlistedAt"
                name="stockEnlistedAt"
                onChange={e => setCompany({ ...company, stockExchangeEnlisted: e.target.value })}>
                <option selected value="NSE" >NSE</option>
                <option value="BSE">BSE</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="addCompanyButton">Create</button>
      </form>

      <ToastContainer />

      {/* <DialogFormBox
        title="Do you wish to add stocks?"
        description="You may add the company stocks later"
        doItLater={doItLater}
        addStock={addStock}
        closeAddStockForm={closeAddStockForm} /> */}
    </div>
  );
}
