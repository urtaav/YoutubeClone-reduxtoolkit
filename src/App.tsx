
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Search from "./pages/Search";
import Watch from "./pages/Watch";
import Home from "./pages/Home";

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/search" element={<Search />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
