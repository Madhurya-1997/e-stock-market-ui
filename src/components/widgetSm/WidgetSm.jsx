import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export default function WidgetSm({ companies }) {

  const history = useHistory();

  const visitCompany = code => history.push(`/company/${code}`)

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Companies Overview</span>
      <ul className="widgetSmList">
        {companies.map(companyDetails => (
          <li key={companyDetails.company.code} className="widgetSmListItem">
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{companyDetails.company.name} </span>
              <span className="widgetSmUserTitle">CEO: <span style={{ fontWeight: 'bold' }}>{companyDetails.company.ceo}</span></span>
              <span className="widgetSmUserTitle">Code: <span style={{ fontWeight: 'bold' }}>{companyDetails.company.code}</span></span>
            </div>
            <button className="widgetSmButton">
              <Visibility
                onClick={() => visitCompany(companyDetails.company.code)}
                className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
}
