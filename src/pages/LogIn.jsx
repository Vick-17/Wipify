import React from 'react';
import NavBar from "../components/NavBar";
import FormLogin from "../components/FormLogin";

const LogIn = () => {
    return (
        <div>
            <div className="nav">
                <NavBar />
            </div>
            <div className="form">
                <FormLogin />
            </div>
        </div>
    );
};

export default LogIn;