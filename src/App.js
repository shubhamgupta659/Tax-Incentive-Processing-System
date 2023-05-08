import { BrowserRouter } from "react-router-dom";
import "./App.css";
import PageContent from "./Components/PageContent";
import TIPSFooter from "./Components/Footer/tipsfooter";
import TIPSHeader from "./Components/Header/tipsheader";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TIPSHeader />
        <PageContent />
        <TIPSFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
