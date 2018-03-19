import React from 'react';
import { Link } from 'react-router-dom';
// import LoadingDots from './LoadingDots';

const Header = () => {
    return (
        <nav>
            <Link to="/" activeClassName="active">Home</Link>
            {" | "}
            <Link to="/courses" activeClassName="active">Courses</Link>
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
        </nav>
    );
};

// prop validation

//Header.propTypes = {
//    loading: PropTypes.bool.isRequired
//}

export default Header;
