import React from 'react';

const Nav = ({children}) => {
    return (
        <nav id="nav" className="nav">
            { children }
        </nav>
    );
};

export default Nav;