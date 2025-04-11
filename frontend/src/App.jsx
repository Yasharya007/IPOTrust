import { Route, Routes } from "react-router-dom";
import CreateIPO from './components/CreateIPO.jsx'
import IPOList from './components/IPOList.jsx'
import IPO from "./components/IPO.jsx";
function App() {

  return (
    <>
    <div id="origin" className="flex">
      <Routes>
        <Route path="/" element={<IPOList/>}/>
        <Route path="/create" element={<CreateIPO/>}/>
        <Route path="/IPO" element={<IPO/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
