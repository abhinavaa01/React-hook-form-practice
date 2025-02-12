import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import Login from "./components/AuthComponents/Login";
import Header from "./components/Header";
import ResetPassword from "./components/AuthComponents/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="resetpassword" element={<ResetPassword />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
