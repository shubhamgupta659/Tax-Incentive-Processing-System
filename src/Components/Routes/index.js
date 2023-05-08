import { Routes, Route } from "react-router-dom";
import FIDash from "../../Pages/FI/dash";
import OICDash from "../../Pages/OIC/dash";
import MGMTDash from "../../Pages/MGMT/dash";
import TIPSHome from "../../Pages/TIPSLogin";
import ApplicationForm from "../../Pages/ApplicationForm/index";
import TIPSLogin from "../../Pages/TIPSLogin/login";
import PreAppForm from "../../Pages/FI/preApp";
import PreAppViewAction from "../../Pages/TIPSView/PreAppView/view";
import AppViewAction from "../../Pages/TIPSView/AppView/view";
import LOAViewAction from "../../Pages/TIPSView/LOAView/view";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TIPSHome />}></Route>
      <Route path="/login" element={<TIPSHome />}></Route>
      <Route path="/tipslogin" element={<TIPSLogin />}></Route>
      <Route path="/fiDash" element={<FIDash />}></Route>
      <Route path="/oicDash" element={<OICDash />}></Route>
      <Route path="/mgmtDash" element={<MGMTDash />}></Route>
      <Route path="/preAppForm/:id" element={<PreAppForm />}></Route>
      <Route path="/appForm/:action/:stage/:id" element={<ApplicationForm />}></Route>
      <Route path="/preAppView/:stage/:id" element={<PreAppViewAction />}></Route>
      <Route path="/appView/:stage/:id" element={<AppViewAction />}></Route>
      <Route path="/loaView/:stage/:id" element={<LOAViewAction />}></Route>
    </Routes>
  );
}

export default AppRoutes;