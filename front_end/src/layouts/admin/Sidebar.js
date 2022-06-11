import React from 'react';
import {Link} from 'react-router-dom';

const SideNavbar = () =>{

    return(
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <Link to="/admin/dashboard" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <Link to="/admin/add-category" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Add Category
                    </Link>
                    <Link to="/admin/view-category" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        View Category
                    </Link>

                    <Link to="/" className="nav-link collapsed"  data-bs-toggle="collapse" data-bs-target="#collapseProducts" aria-expanded="false" aria-controls="collapseProducts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Products
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProducts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link to="/admin/add-product" className="nav-link" >Add Product</Link>
                            <Link to="/admin/view-product" className="nav-link" >View Products</Link>
                        </nav>
                    </div>

                    <Link to="/admin/profile" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Profile
                    </Link>
                    <div className="sb-sidenav-menu-heading">Interface</div>
                    <Link to="/" className="nav-link collapsed"  data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Layouts
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link to="/" className="nav-link" >Static Navigation</Link>
                            <Link to="/" className="nav-link" >Light Sidenav</Link>
                        </nav>
                    </div>
                    <Link to="/" className="nav-link collapsed"  data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                        <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                        Pages
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <Link to="/" className="nav-link collapsed"  data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                Authentication
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link  to="/" className="nav-link">Login</Link>
                                    <Link to="/" className="nav-link" >Register</Link>
                                    <Link to="/" className="nav-link" >Forgot Password</Link>
                                </nav>
                            </div>
                            <Link to="/" className="nav-link collapsed"  data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                Error
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link to = "/" className="nav-link" >401 Page</Link>
                                    <Link to = "/" className="nav-link" >404 Page</Link>
                                    <Link to = "/" className="nav-link" >500 Page</Link>
                                </nav>
                            </div>
                        </nav>
                    </div>
                    <div className="sb-sidenav-menu-heading">Addons</div>
                    <Link to="/" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                        Charts
                    </Link>
                    <Link  to="/" className="nav-link">
                        <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                        Tables
                    </Link>
                </div>
            </div>
            <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
                Start Bootstrap
            </div>
        </nav>
    );
}
export default SideNavbar;