import axios from "axios";
import React, {useState,useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function EditProduct()
{
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    const [categorylist, setCatagoryList] = useState([]);
    const [productInput, setProduct] = useState({
        category_id:'',
        slug:'',
        name:'',
        description:'',

        meta_title:'',
        meta_keyword:'',
        meta_descrip:'',

        selling_price:'',
        original_price:'',
        qty:'',
        brand:'',
        berat:'',
    });

    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true)

    const handleInput = (e)=>{
        e.persist();
        setProduct({...productInput, [e.target.name]:e.target.value});
    }

    const handleImage = (e)=>{
        e.persist();
        setPicture({image: e.target.files[0]});
    }

    const [allcheckbox, setCheckBox]=useState([]);

    const handleCheckbox = (e)=>{
        e.persist();
        setCheckBox({...allcheckbox, [e.target.name]:e.target.checked})
    }
    useEffect(()=>{

        axios.get(`/api/all-category`).then(res=>{
            if(res.data.status === 200){
                setCatagoryList(res.data.category);
            }
        });

        axios.get(`/api/edit-product/${id}`).then(res=>{
            if(res.data.status === 200){
                // console.log(res.data.product);
                setProduct(res.data.product);
                setCheckBox(res.data.product);
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message,"error");
                navigate(`/admin/view-product`, {replace:true});
            }
            setLoading(false);
        })
    }, [id, navigate]);

    const updateProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('category_id', productInput.category_id);
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);

        formData.append('meta_title', productInput.meta_title);
        formData.append('meta_keyword', productInput.meta_keyword);
        formData.append('meta_descrip', productInput.meta_descrip);

        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('qty', productInput.qty);
        formData.append('brand', productInput.brand);
        formData.append('featured', allcheckbox.featured ? '1':'0');
        formData.append('popular', allcheckbox.popular ? '1':'0');
        formData.append('status', allcheckbox.status ? '1':'0');
        formData.append('berat', productInput.berat);

        axios.post(`/api/update-product/${id}`, formData).then(res=>{
            if(res.data.status === 200){
                swal("Success", res.data.message,"success");
                setError([]);
                navigate(`/admin/view-product`,{replace:true});
            }
            else if(res.data.status === 422){
                swal("Error","All Fields are Mandatory","error");
                setError(res.data.errors);
            }else if(res.data.status === 404){
                swal("Error",res.data.message,"error");
                navigate(`/admin/view-product`,{replace:true});
            }
        });
    }
    if(loading){
        return <h4>Edit Product Data Loading...</h4>
    }
    return(
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Product
                        <Link to = "/admin/view-product" className="btn btn-primary btn-sm float-end"> View Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateProduct} encType="multipart/form-data">

                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="seo-tab" data-bs-toggle="tab" data-bs-target="#seo" type="button" role="tab" aria-controls="seo" aria-selected="false">SEO Tags</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other Details</button>
                        </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                
                                <div className="form-group mb-3">
                                    <label>Select Category</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                                        <option>Select Category</option>
                                        {
                                            categorylist.map((item)=>{
                                                return(
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className="text-danger">{errorlist.category_id}</small>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className='form-control' />
                                    <small className="text-danger">{errorlist.slug}</small>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={productInput.name} className='form-control' />
                                    <small className="text-danger">{errorlist.name}</small>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={productInput.description} className='form-control'> </textarea>
                                </div>
                            
                            </div>
                            <div className="tab-pane fade" id="seo" role="tabpanel" aria-labelledby="seo-tab">
                                
                                <div className='form-group mb-3'>
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className='form-control' />
                                    <small className="text-danger">{errorlist.meta_title}</small>
                                </div>
                                
                                <div className='form-group mb-3'>
                                    <label>Meta Keyword</label>
                                    <textarea name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className='form-control'> </textarea>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Meta Description</label>
                                    <textarea name="meta_descrip" onChange={handleInput} value={productInput.meta_descrip} className='form-control'> </textarea>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                                
                                <div className="row">
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Selling Price</label>
                                        <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
                                        <small className="text-danger">{errorlist.selling_price}</small>
                                    </div>
                                    <div className="col-md form-group mb-3">
                                        <label>Original Price</label>
                                        <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Quantity</label>
                                        <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className="form-control" />
                                        <small className="text-danger">{errorlist.original_price}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Brand</label>
                                        <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control" />
                                        <small className="text-danger">{errorlist.brand}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="image" onChange={handleImage} className="form-control" />
                                        <small className="text-danger">{errorlist.image}</small>
                                        <img src={`http://localhost:8000/${productInput.image}`} width="50px" alt={productInput.name}></img>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Berat</label>
                                        <input type="text" name="berat" onChange={handleInput} value={productInput.berat} className="form-control" />
                                        <small className="text-danger">{errorlist.berat}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Featured (checked=shown)</label>
                                        <input type="checkbox" name="featured" onChange={handleCheckbox} defaultChecked={allcheckbox.featured === 1 ? true:false} className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Popular (checked=shown)</label>
                                        <input type="checkbox" name="popular" onChange={handleCheckbox} defaultChecked={allcheckbox.popular === 1 ? true:false} className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Status (checked=hidden)</label>
                                        <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true:false} className="w-50 h-50" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;