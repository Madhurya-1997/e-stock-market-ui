import "./companyList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCompany, getCompanies, getCompany } from "../../actions/companies";
import Loader from "../../components/loader/Loader";
import DialogAlertBox from "../../components/dialog/DialogAlertBox";
import { Visibility } from "@material-ui/icons";

export default function CompanyList() {

  const [open, setOpen] = useState(false);
  const { isLoading, companies, error } = useSelector((state) => state.companies);
  const [code, setCode] = useState('');

  let data = null;
  if (!isLoading) {
    data = companies.map(companyDetail => companyDetail.company);
  }
  const dispatch = useDispatch();
  const history = useHistory();


  const removeCompany = async (code) => {
    await dispatch(deleteCompany(code));
    setOpen(false);

    await dispatch(getCompanies());
    history.push('/');
    // if (!isLoading && !(typeof (error) === undefined)) {
    //   history.push('/');
    // }
  }

  const handleDelete = code => {
    setOpen(true)
    setCode(code)
  }

  const visitStocks = code => {
    dispatch(getCompany(code))
    history.push(`/company/${code}`)
  }

  let dialogContent = (
    <DialogAlertBox
      title="Are you sure you want to delete?"
      description="Note that you will delete all the stocks along with the company details."
      close={() => setOpen(false)}
      removeCompany={() => removeCompany(code)}
      open={open} />
  )


  // useEffect(() => {

  // }, [isLoading])

  // useEffect(() => {
  //   if (error) {
  //     toast.error("Please enter the correct fields !!")
  //   }
  // }, [error])


  const columns = [
    { field: "code", headerName: "Code", width: 120 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    { field: "ceo", headerName: "CEO", width: 120 },
    {
      field: "stockExchangeEnlisted",
      headerName: "Enlisted At",
      width: 180,
    },
    {
      field: "turnover",
      headerName: "Turnover",
      width: 160,
    },
    {
      field: "website",
      headerName: "Website",
      width: 160
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/company/" + params.row.code}> */}
            <Visibility
              style={{ color: "green", marginRight: "10px" }}
              onClick={() => visitStocks(params.row.code)} />
            {/* <button
                className="companyListEdit"
                >Stocks</button> */}
            {/* </Link> */}
            <DeleteOutline
              className="companyListDelete"
              onClick={() => handleDelete(params.row.code)}
            />
          </>
        );
      },
    }
  ];

  return (
    <>
      {isLoading ? <Loader /> : (
        <div className="companyList">
          <div className="createCompany">
            <Link to="/newcompany">
              <button className="companyAddButton">Create Company</button>
            </Link>
          </div>
          <DataGrid
            autoHeight
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
          />
          {dialogContent}
        </div>
      )}
    </>

  );
}
