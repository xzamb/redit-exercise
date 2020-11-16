import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';

import './Header.css';

const Header = () => {

    const [hideNav, setHideNav] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => setHideNav(window.scrollY > 100));
    }, []);

    return (
        <nav className={`header ${hideNav? 'header__hideNav' : ''} `}>
                <Link to="/">
                    <h1>Insurance Company</h1>
                </Link>
        </nav>
    );
}

export default Header;