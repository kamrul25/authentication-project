import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="text-center text-3xl font-semibold mt-8">
            <Link to="/" className="mr-4">Home</Link>
            <Link to="/signIn" className="mr-4">Sign In</Link>
            <Link to="/signUp" className="mr-4">Sign Up</Link>
            
        </nav>
    );
};

export default Header;