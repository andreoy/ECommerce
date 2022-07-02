import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders(){

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        document.title = "Orders";
        axios.get(`/api/admin/orders`).then(res=>{
            if(res.data.status === 200){
                setOrders(res.data.orders);
                setLoading(false);
            }
        });
    },[]);

    var display_orders='';
    var Orderstatus='';

    if(loading){
        return <h4>Orders is Loading ...</h4>
    }
    else{
        display_orders=orders.map( (item)=>{
            if(item.status == '0')
            {
                Orderstatus =<span className="float-end badge btn-sm btn-danger badge-pil">Pending</span>;
            }else if(item.status == '1')
            {
                Orderstatus = <span className="float-end badge btn-sm btn-success badge-pil">Completed</span>;
            }else if(item.status == '2')
            {
                Orderstatus = <span className="float-end badge btn-sm btn-warning badge-pil">Canceled</span>;
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.tracking_no}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{Orderstatus}</td>
                    <td>
                        <Link to={`/admin/view-order`} state={{id:item.id}} className="btn btn-success btn-sm">View</Link>
                    </td>
                </tr>
            )
        });

    }

    return(
        <div className="card px-4 mt-3">
            <div className="card-header">
                <h4>Orders</h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table=striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tracking No</th>
                                <th>Phone </th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {display_orders}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}
export default Orders;


