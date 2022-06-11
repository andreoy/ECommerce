import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/admin/dashboard';
import Profile from "./components/admin/profile";
import Home from "./components/frontend/home";
import Login from "./components/frontend/auth/login";
import Register from "./components/frontend/auth/register";
import Page403 from "./components/errors/Page403";
import Page404 from "./components/errors/Page404";
import AdminPrivateRoute from "./AdminPrivateRoute";
import Category from "./components/admin/category/category";
import ViewCategory from "./components/admin/category/viewcategory";
import EditCategory from "./components/admin/category/editcategory";
import AddProduct from "./components/admin/product/addproduct.js";
import ViewProduct from "./components/admin/product/viewproduct";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers['Content-Type']='application/json';
axios.defaults.headers['Accept']='application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ?`Bearer ${token}`:``;
  return config;
});


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/403" element={<Page403 />}/>
          <Route exact path="/404" element={<Page404 />}/>
          {/* <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/> */}

          <Route path="/login" element={localStorage.getItem('auth_token')?<Navigate to='/'/>:<Login />} /> 
          <Route path="/register" element={localStorage.getItem('auth_token')?<Navigate to='/'/>:<Register />} />
          
          <Route path="/admin" element={<AdminPrivateRoute />}>
            <Route path="dashboard" name="dashboard" exact element={<Dashboard />} />
            <Route path="profile" name="profile" exact element={<Profile />} />
            <Route path="add-category" name="category" exact element={<Category />} />
            <Route path="view-category" name="viewcategory" exact element={<ViewCategory />}/>
            <Route path="edit-category" name="editcategory" exact element={<EditCategory />}/>
            <Route path="add-product" name="addproduct" exact element={<AddProduct />}/>
            <Route path="view-product" name="viewproduct" exact element={<ViewProduct />}/>
            <Route path="/admin" element={<Navigate to="dashboard" replace />} />
          </Route>
        </Routes>  
    </BrowserRouter>
    </div>
  );
}

export default App;
