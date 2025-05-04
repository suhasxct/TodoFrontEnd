import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./components/signup";
import { Login } from "./components/login";
import { Home } from "./components/home";
import { Forgot } from "./components/forgotpassword";
import { ErrorPage } from "./components/errorpage";
import { Profile } from "./components/profile";
import { Otp } from "./components/otp";
import OAuthSuccess from "./components/redirect";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgotpassword" element={<Forgot />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
