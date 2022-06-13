import React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from '../../layouts/frontend/Navbar';

const FrontendLayout = () =>{

    return(
        <div>
            <Navbar />
            <div>
                <Outlet />             
            </div>
        </div>
    )
}
export default FrontendLayout;