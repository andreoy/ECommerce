import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function ViewProductPub(){

    const {slug} = useParams();
    const [loading,setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{

        let isMounted = true;

        axios.get(`/api/fetchproducts/${slug}`).then(res=>{
            if(isMounted){
                if(res.data.status === 200){
                    setProduct(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
                    setLoading(false);
                    console.log(res.data.product_data.product);
                }
                else if(res.data.status === 400){
                    swal("Warning", res.data.message,"");
                }
                else if(res.data.status === 404){
                    navigate(`/collections`,{replace:true});
                    swal("Warning", res.data.message,"error");
                }
            }
        })

        return() =>{
            isMounted = false;
        };

    },[]);

    if(loading){
        return <h4>Loading Product ...</h4>
    }
    else{
        var showProductList = '';
        showProductList = product.map( (item, idx)=>{
            return(
                <div className="col-md-3" key={idx}>
                    <div className="card">
                        <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                            <img src={`http://localhost:8000/${item.image}`} className="w-100" alt={item.name} />
                        </Link>
                    
                        <div className="card-body">
                            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                <h5>{item.name}</h5>
                            </Link>               
                        </div>
                    </div>
                </div>
            )
        });
    }
    return(
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collections / {category.name}</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showProductList}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProductPub;