import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";
import { Profile } from "./pages/profile/Profile";
import { Listings } from "./pages/listings/Listings";
import SubleaseInfo from "./pages/SubleaseInfo";
import useAuth from "./hooks/useAuth";

import NotFound from "./pages/NotFound";

function RequireAuth({ children }) {
    const { authed } = useAuth();
    console.log("authed value " + authed)
    return authed == true ? children : <Navigate to="/" replace />;
}


const ProjectRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                } />
                <Route path="/profile" element={
                    <RequireAuth> <Profile /></RequireAuth>
                } />
                <Route path="/listings" element={
                    <RequireAuth>
                        <Listings />
                    </RequireAuth>} />
                <Route path="/sublease/:id" element={
                    <RequireAuth>
                        <SubleaseInfo />
                    </RequireAuth>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};
export default ProjectRoutes;