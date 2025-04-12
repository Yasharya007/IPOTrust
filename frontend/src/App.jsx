import { Route, Routes } from "react-router-dom";
import CreateIPO from './components/CreateIPO.jsx'
import IPOList from './components/IPOList.jsx'
import IPO from "./components/IPO.jsx";
import CheckMyHash from "./components/CheckMyHash.jsx";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<IPOList/>}/>
        <Route path="/create" element={<CreateIPO/>}/>
        <Route path="/IPO" element={<IPO/>}/>
        <Route path="/check" element={<CheckMyHash/>}/>
      </Routes>
    </>
  )
}

export default App
