import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function ProductDetail(){
    const [loading,setLoading] = useState(true);
    const {category_slug, product_slug} = useParams();
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    useEffect(()=>{

        let isMounted = true;

        axios.get(`/api/view-product-detail/${category_slug}/${product_slug}`).then(res=>{
            if(isMounted){
                if(res.data.status === 200){
                    setProduct(res.data.product);
                    setLoading(false);
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


    const handleDecrement = () =>{
        if(quantity > 1){
            setQuantity(preCount => preCount - 1);
        }
    }

    const handleIncrement = () =>{
        if(quantity < 10){
            setQuantity(preCount => preCount + 1);
        }
    }


    const submitAddtoCart = (e) =>{
        e.preventDefault();

        const data = {
            product_id: product.id,
            product_qty: quantity,
        }

        axios.post(`/api/add-to-cart`, data).then(res=>{
            if(res.data.status === 201){
                swal("Success", res.data.message, "success");
            }else if(res.data.status === 409){
                swal("Warning", res.data.message,"Warning");
            }else if(res.data.status === 401){
                swal("Error", res.data.message,"error");
            }else if(res.data.status === 404){
                swal("Warning", res.data.message,"Warning");
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Product Detail ...</h4>
    }
    else{

        var avail_stock = '';

        if(product.qty > 0){
            avail_stock = <div>
                <label className="btn-sm btn-success px-4 mt-2">In Stock</label>
                <div className="row">
                    <div className="col-md-3 mt-3">
                        <div className="input-group">
                            <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                            <div className="form-control text-center">{quantity}</div>
                            <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
                        </div>
                    </div>
                    <div className="col-md-3 mt-3">
                        <button type="button" className="btn btn-primary w-100" onClick={submitAddtoCart}>Add to Chart</button>
                    </div>
                </div>
            </div>
        }
        else{
            avail_stock = <div>
                <label className="btn-sm btn-danger px-4 mt-2">Out of Stock</label>
            </div>
        }
    }


    return(

        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collections / {product.category.name} / {product.name}</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        
                        <div className="col-md-4 border-end">
                            <img src={`http://localhost:8000/${product.image}`} alt={product.name} className="w-100" />
                        </div>

                        <div className="col-md-8">
                            <h4>
                                {product.name}
                                <span className="float-end badge btn-sm btn-danger badge-pil">{product.brand}</span>
                            </h4>
                            <p>{product.description}</p>
                            <h4 className="mb-1">
                                Rp: {product.selling_price}
                                <s className="ms-2">Rp: {product.original_price}</s>
                            </h4>
                            <div>
                               {avail_stock}
                            </div>
                            <button type="button" className="btn btn-danger mt-3">Add to Wishlist</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;