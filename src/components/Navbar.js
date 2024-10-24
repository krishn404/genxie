import React from 'react';
import AppleStyleDock from './AppleStyleDock';

const Navbar = ({ onThemeToggle }) => {
    return (
        <nav>
            <AppleStyleDock onThemeToggle={onThemeToggle} />
        </nav>
    );
};

export default Navbar;

