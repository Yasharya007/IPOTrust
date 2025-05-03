import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateIPO from './components/CreateIPO.jsx'
import IPOList from './components/IPOList.jsx'
import IPO from "./components/IPO.jsx";
import CheckMyHash from "./components/CheckMyHash.jsx";
import CheckList from "./components/CheckList.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import ResearchPaper from "./components/ReseachPaper.jsx";
import ContactUs from "./components/ContactUs.jsx";
import LandingPage from "./components/LandingPage.jsx";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<IPOList />} />
        <Route path="/create" element={<CreateIPO />} />
        <Route path="/IPO" element={<IPO />} />
        <Route path="/check" element={<CheckMyHash />} />
        <Route path="/result" element={<CheckList />} />
        <Route path="/ResearchPaper" element={<ResearchPaper />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/LandingPage" element={<LandingPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
