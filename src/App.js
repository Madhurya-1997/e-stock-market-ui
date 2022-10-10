import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Overview from "./pages/overview/Overview";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewStock from "./pages/newStock/NewStock";
import CompanyList from "./pages/companyList/CompanyList";
import Company from "./pages/company/Company";
import NewCompany from "./pages/newCompany/NewCompany";

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <CompanyList />
          </Route>
          {/* <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route> */}
          <Route path="/newstock">
            <NewStock />
          </Route>
          <Route path="/overview/:code">
            <Overview />
          </Route>
          <Route path="/company/:code">
            <Company />
          </Route>
          <Route path="/newcompany">
            <NewCompany />
          </Route>
        </Switch>
      </div>
    </BrowserRouter >
  );
}

export default App;
