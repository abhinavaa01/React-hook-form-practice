import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Auth/Login";
import Header from "./components/Header";
import ResetPassword from "./pages/Auth/ResetPassword";
import Form from "./pages/Form";
import Toasts from "./components/Toasts";
import Home from "./pages/Home";

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
      <Toasts />
    </BrowserRouter>
  );
}

export default App;
