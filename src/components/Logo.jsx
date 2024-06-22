import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => {
    return (
        <div>
            <NavLink to="/">
                <h1>KingdomGame</h1>
            </NavLink>
        </div>
    );
};

export default Logo;