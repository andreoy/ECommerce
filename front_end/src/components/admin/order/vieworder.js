import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import swal from 'sweetalert';

function ViewOrder(){

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    const [order, setOrder] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        axios.get(`/api/admin/order/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                console.log(res.data.order);
                setOrder(res.data.order);
                setCart(res.data.order.orderitems);
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message, 'error');
                navigate(`/admin/orders`,{replace:true});
            }
            setLoading(false);
        });

    },[]);

    if(loading)
    {
        return <h4>Loading Order Information...</h4>
    }

    var order_html = '';

    if(order){
        order_html = <div>

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
                                <input type="text" name="firstname" value={order.firstname} disabled className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>Last Name</label>
                                <input type="text" name="lastname" value={order.lastname} disabled className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>Phone</label>
                                <input type="text" name="phone" value={order.phone} disabled className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label>Email Address</label>
                                <input type="text" name="email" value={order.email} disabled className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <label>Full Address</label>
                                <input type="text" name="address" value={order.address} disabled className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>City</label>
                                <input type="text" name="city" value={order.city} disabled className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>State</label>
                                <input type="text" name="state" value={order.state} disabled className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>Zip Code</label>
                                <input type="text" name="zipcode" value={order.zipcode} disabled className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group text-end">
                                {/* <button type="button" className="btn btn-primary" onClick={submitComplete}>Completed</button> */}
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
                        // totalCartPrice += item.product.selling_price * item.product_qty;
                        return (
                            <tr key={item.id}>
                                <td>{item.product.name}</td>
                                <td>{item.price}</td>
                                <td>{item.qty}</td>
                                <td>{item.price * item.qty}</td>
                        </tr>
                        )
                    })}

                    <tr>
                        {/* <td colSpan="2" className="text-end bold">Grand Total</td>
                        <td colSpan="2" className="text-end bold">{totalCartPrice}</td> */}
                    </tr>
                </tbody>
                
            </table>
        </div>
    </div>
 </div>
    }

    return(
        <div className="py-4">
                <div className="container">
                    {order_html}
                </div>
            </div>
    )
}  

export default ViewOrder;