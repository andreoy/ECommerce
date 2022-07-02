import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Checkout()
{

    const navigate = useNavigate();

    if(!localStorage.getItem('auth_token')){
        navigate(`/`,{replace:true} );
        swal("Warning", "Login to goto Cart Page", "error");
    }

    const [loading, setLoading] = useState(true);
    const [cart, setCart] =useState([]);
    const [provinsi, getProvinsi] = useState([]);

    var totalCartPrice = 0;

    const[checkoutInput, setCheckoutInput]=useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });

    const [error, setError] = useState([]);

    useEffect(()=>{
        let isMounted = true;

        axios.get(`/api/cart`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if(res.data.status === 401)
                {
                    navigate('/',{replace:true});
                    swal("Warning", res.data.message,"error");
                }
            }
        });

        axios.get(`	https://api.rajaongkir.com/starter/province`,{ headers : {'key': 'c88d05b014cff1d1e82a02f25879e906'}}).then(res=>{
            if(res.data.code === 200){
                console.log(res.data);
            }
        });

        return()=>{
            isMounted = false;
        }
    },[]);

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput,[e.target.name]:e.target.value});
    }

    const submitOrder = (e) => {
        e.preventDefault();

        const data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
        }

        axios.post(`/api/place-order`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Order Placed Successfully", res.data.message, "success");
                setError([]);
                navigate(`/thank-you`,{replace:true});
            } else if(res.data.status === 422)
            {
                swal("All field are mandetory","","error");
                setError(res.data.errors);
            }
        });

       ;
    }

    if(loading){
        return <h4>Loading Checkout ... </h4>
    }

    var checkout_HTML = '';

    if(cart.length > 0){
        checkout_HTML = <div>

                    <div className="row">

                    <div className="col-md-7">
                        <div className="card">
                            <div className="card-header">
                                <h4>Basic Information</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>First Name</label>
                                            <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                            <small className="text-danger">{error.firstname}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Last Name</label>
                                            <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                                            <small className="text-danger">{error.lastname}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Phone</label>
                                            <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                            <small className="text-danger">{error.phone}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Email Address</label>
                                            <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                            <small className="text-danger">{error.email}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Full Address</label>
                                            <input type="text" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control" />
                                            <small className="text-danger">{error.address}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>City</label>
                                            <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                            <small className="text-danger">{error.city}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>State</label>
                                            <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                                            <small className="text-danger">{error.state}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>Zip Code</label>
                                            <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
                                            <small className="text-danger">{error.zipcode}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group text-end">
                                            <button type="button" className="btn btn-primary" onClick={submitOrder}>Place Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-5">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th width="50%">Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item)=>{
                                    totalCartPrice += item.product.selling_price * item.product_qty;
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.product.name}</td>
                                            <td>{item.product.selling_price}</td>
                                            <td>{item.product_qty}</td>
                                            <td>{item.product.selling_price * item.product_qty}</td>
                                    </tr>
                                    )
                                })}

                                <tr>
                                    <td colSpan="2" className="text-end bold">Grand Total</td>
                                    <td colSpan="2" className="text-end bold">{totalCartPrice}</td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
             </div>
    }else{
        checkout_HTML = <div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Your Shopping Cart is Empty. You are in Checkout Page</h4>
            </div>
        </div>
    }
    return(
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Checkout</h6>
                </div>
            </div>
            <div className="py-4">
                <div className="container">
                    {checkout_HTML}
                </div>
            </div>
        </div>
    )

}

export default Checkout;