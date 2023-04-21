import React from 'react';
import { NavLink } from 'react-router-dom';

const buttonArticle = () => {
    return (
        <div>
            <NavLink to="*" className="btnGoArticle">
              <button className='goToArticle'>En voir plus</button>
            </NavLink>
        </div>
    );
};

export default buttonArticle;