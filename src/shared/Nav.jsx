import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className='grid justify-center items-center grid-cols-4 p-4 bg-slate-400'>
            <Link to='/'>Home</Link>
            <Link to='/form'>Form</Link>
        </div>
    );
};

export default Nav;