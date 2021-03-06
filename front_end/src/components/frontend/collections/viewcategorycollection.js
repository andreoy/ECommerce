import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewCategoryCollection(){

    const[loading, setLoading] = useState(true);
    const[category, setCategory] = useState([]);
    useEffect(()=>{
        let isMounted = true;
        axios.get(`/api/getCategory`).then(res=>{

            if(isMounted){
                if(res.data.status === 200){
                    // console.log(res.data.category);
                    setCategory(res.data.category);
                    setLoading(false);
                }
            }
        });
        return ()=>{
            isMounted = false;
        }
    },[]);

    if(loading){
        return <h4>Loading Category ...</h4>
    }
    else{
        var showCategoryList = '';
        showCategoryList = category.map((item)=>{
            return(
                <div className="col-md-4" key={item.id}>
                    <div className="card">
                        <Link to = "">
                            <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name} />
                        </Link>
                        <div className="card-body">
                                <Link to={`${item.slug}`}>
                                    <h5>{item.name}</h5>
                                </Link>
                        </div>
                    </div>
                </div>
            );
        });
    }
    return(
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Category Page</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showCategoryList}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCategoryCollection;