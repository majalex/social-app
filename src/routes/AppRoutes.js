import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import SignUp from "../views/SignUp";

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path="/social-app" element={<Home user={props.user} />} />
            <Route path="/social-app/login" element={<Login user={props.user} setUser={props.setUser} />} />
            <Route path="/social-app/signup" element={<SignUp user={props.user} />} />
        </Routes>
    );
}

export default AppRoutes;