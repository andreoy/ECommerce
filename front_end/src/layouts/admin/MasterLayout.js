import React from 'react';
import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

import Dashboard from '../../components/admin/dashboard';

const MasterLayout = () =>{

    return(
        <div className="sb-nav-fixed">
            <Navbar />
            <div id = "layoutSidenav">
                <div id = "layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id = "layoutSidenav_content">
                    <main>
                        <Outlet />             
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

<Routes>
    <Route path="/admin" name="Admin" element={<Dashboard />}/>
</Routes>
export default MasterLayout;