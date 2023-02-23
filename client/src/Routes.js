import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";
import NotFound from "./pages/NotFound";
import SubleaseInfo from "./pages/SubleaseInfo";
const ProjectRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/sublease/:id" element={<SubleaseInfo />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};
export default ProjectRoutes;
