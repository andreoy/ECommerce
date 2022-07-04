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
    const [listprovinsi, setProvinsi] = useState([]);
    const [listkota, setKota] = useState([]);

    var totalCartPrice = 0;
    var totalBerat = 0;

    const[checkoutInput, setCheckoutInput]=useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        kurir:'jne',

    });

    const [error, setError] = useState([]);

    const [shipingfee, setShipingfee]=useState();

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

        axios.get(`/api/get-provinsi`).then(res=>{
            if(res.data.status ===200){
                setProvinsi(res.data.provinsi.rajaongkir.results);
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

    const handleProvinsi = (e) => {
        e.persist();

        axios.get(`/api/get-kota/${e.target.value}`).then(res=>{
            if(res.data.status === 200){
                setKota(res.data.kota.rajaongkir.results);
            }
        });
        setCheckoutInput({...checkoutInput,[e.target.name]:e.target.value});
    }

    const handleKota = (e)=>{
        e.persist();

        axios.get(`/api/shiping-fee/${e.target.value}/${totalBerat}/${checkoutInput.kurir}`).then(res=>{
            if(res.data.status === 200){
                setShipingfee(res.data.kota.rajaongkir.results[0].costs[0].cost[0].value);
            }
        });
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
            shipping_fee: shipingfee,
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
                                        <label>Provinsi</label>
                                        <select name="city" onChange={handleProvinsi} value={checkoutInput.city} className="form-control">
                                            <option>Pilih Provinsi</option>
                                            {
                                                listprovinsi.map((item)=>{
                                                    return(
                                                        <option value={item.province_id} key={item.province_id}>{item.province}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <small className="text-danger">{error.city}</small>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>Kota</label>
                                            <select name="state" onChange={handleKota} value={checkoutInput.state} className="form-control">
                                            <option>Pilih Kota</option>
                                            {
                                                listkota.map((item)=>{
                                                    return(
                                                        <option value={item.city_id} key={item.city_id}>{item.city_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <small className="text-danger">{error.state}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>Kurir</label>
                                            <select name="kurir" onChange={handleInput} value={checkoutInput.kurir} className="form-control">
                                                <option>Pilih Kurir</option> 
                                                <option value='jne' >JNE</option>
                                        </select>
                                        <small className="text-danger">{error.state}</small>
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
                                    totalBerat += item.product.berat * item.product_qty;
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
                                <tr>
                                    <td colSpan="2" className="text-end bold">Biaya Kirim  {totalBerat} gram</td>
                                    <td colSpan="2" className="text-end bold">{shipingfee}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="text-end bold">Total Bayar</td>
                                    <td colSpan="2" className="text-end bold">{shipingfee+totalCartPrice}</td>
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