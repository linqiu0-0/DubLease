import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";
import {Profile} from "./pages/profile/Profile";
import SubleaseInfo from "./pages/SubleaseInfo";

import NotFound from "./pages/NotFound";

const ProjectRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/sublease/:id" element={<SubleaseInfo />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};
export default ProjectRoutes;
