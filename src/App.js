import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import Login from "./components/AuthComponents/Login";
import Header from "./components/Header";
import ResetPassword from "./components/AuthComponents/ResetPassword";
import Form from "./components/Form";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
