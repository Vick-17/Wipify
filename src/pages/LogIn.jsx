import React from 'react';
import NavBar from "../components/NavBar";
import FormLogin from "../components/FormLogin";
import Footer from "../components/Footer";

const LogIn = () => {
    return (
        <div>
            <div className="nav">
                <NavBar />
            </div>
            <div className="form">
                <FormLogin />
            </div>
            <div className="foot">
                <Footer />
            </div>
        </div>
    );
};

export default LogIn;