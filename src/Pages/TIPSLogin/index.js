import {
  Button,
} from "antd";
import { useNavigate } from "react-router-dom";

function TIPSHome() {
  const navigate = useNavigate();
  const onSpLoginClick = (item) => {
    navigate(`/tipslogin`);
  };

  const onLoginClick = (item) => {
    navigate(`/tipslogin`);
  };

  return (
    <div className="login-main">
      <div className="login-header">
        <div className="login-welcome">Welcome to MAS Transactions Portal</div>
        <div className="login-section"><Button type="primary" onClick={onSpLoginClick} danger>
          Log in with singpass</Button></div>
        <div className="corppass-intro-text">
          Click <div className="login-click-here" onClick={onLoginClick}><u><b>here</b></u></div> to login with userid and password
        </div>
      </div>
      <div className="login-notice">
        <div className="login__announcement-wrapper">
          <p className="login__body-title">Important announcements</p>
          <div>
            <p className="login__announcement-title">Additional Virtual Guided Session - 20 April 2023</p>
            <p className="login__announcement-content">We will be conducting an additional virtual guided session to help users familiarise themselves with MAS-Tx features. The session will be held on 20 April 2023 from 2.30pm to 3.30pm via Zoom. For those who are keen, please register using this link: https://go.gov.sg/mas-tx-guided-session-april .</p>
          </div>
          <div>
            <p className="login__announcement-title">Fund Management Transactions - 28 Feb 2023</p>
            <p className="login__announcement-content">You can now view your fund management-related transactions (eg. Forms 11, 23A, 24A) on MAS-Tx! Only submissions to MAS made after 27 Feb 2023 will be displayed in MAS-Tx. Do let us know if you spot any errors.</p>
          </div>
          <div>
            <p className="login__announcement-title">Hide/Unhide Upcoming Tasks - 31 Jan 2023</p>
            <p className="login__announcement-content">We have fixed the bug preventing certain users from being unable to hide / unhide upcoming tasks. Try clearing your cache / browser history if you continue to receive an error message.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TIPSHome;