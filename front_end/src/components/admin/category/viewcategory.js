import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';



function ViewCategory(){

    const[loading, setLoading] = useState(true);
    const[categoryList, setCatagoryList] = useState([]);

    useEffect(()=>{
        axios.get(`/api/view-category`).then(res=>{
            if(res.status === 200){
                setCatagoryList(res.data.category)
            }
            setLoading(false);
          })

    },[]);

    var viewcategory_TABLEHTML = "";

    if(loading){
        return <h4>Loading Category...</h4>
    }
    else{
        viewcategory_TABLEHTML =
            categoryList.map( (item)=>{
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>
                        <td>{item.status}</td>
                        <td>
                            <Link to = {`/admin/edit-category`} state={{id:item.id}} className="btn btn-success btn-sm">Edit</Link>
                        </td>
                        <td><button className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
                )
            } )
    }

    return(
        <div className="container pm-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Category List
                        <Link to = "/admin/add-category" className="btn btn-primary btn-sn float-end ">Add Category</Link>
                    </h4> 
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewcategory_TABLEHTML}
                        </tbody>
                    </table>
                </div>


        </div>
        </div>

    )

}

export default ViewCategory;