import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import swal from 'sweetalert';

function EditCategory(){

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;
    const [categoryInput, setCategory] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState([]);
    const[chkbx, setChkbx] = useState(false);
    const [picture, setPicture] = useState([]);
    
    useEffect(()=>{
   
        axios.get(`/api/edit-category/${id}`).then(res=>{
            if(res.data.status === 200){
                setCategory(res.data.category);
                if(res.data.category.status === 1){
                    setChkbx(true);
                }
            }else if(res.data.status === 404){
                swal("Error", res.data.message, 'error');
                navigate(`/admin/view-category`,{replace:true});
            }
            setLoading(false);
        });

    }, [id, navigate]);

    const handleInput = (e)=>{
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value});
    }

    const handleImage = (e)=>{
        e.persist();
        setPicture({image: e.target.files[0]});
    }


    const updateCategory = (e) => {
        e.preventDefault();
        const id_update = id;
        const formData = new FormData();
        formData.append('slug',categoryInput.slug);
        formData.append('name',categoryInput.name);
        formData.append('description',categoryInput.descrip);
        formData.append('status',categoryInput.status);
        formData.append('meta_title',categoryInput.meta_title);
        formData.append('meta_keyword',categoryInput.meta_keyword);
        formData.append('meta_descrip',categoryInput.meta_descrip);
        formData.append('image', picture.image);

        if(document.getElementById('status').checked){
            categoryInput.status = 1;
        }else{
            categoryInput.status = 0;
        }
        axios.post(`/api/edit-category/${id_update}`, formData).then(res=>{
            if(res.data.status === 200){
                swal("Success", res.data.message,"success");
                setError([]);
                navigate(`/admin/view-category`,{replace:true});
            }else if(res.data.status === 422){
                swal("All fields are manderoty","","error");
                setError(res.data.errors);
            }else if(res.data.status === 404){
                swal("Error", res.data.message,"error");
                navigate(`/admin/view-category`,{replace:true});
            }
        })
    }

    if(loading)
    {
        return <h4>Loading Edit Category...</h4>
    }
    return(
        <div className='container px-4'>
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Category
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">Back</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateCategory}>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border  fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className='form-group mb-3'>
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className='form-control' />
                                    <small className="text-danger">{error.slug}</small>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className='form-control' />
                                    <small className="text-danger">{error.name}</small>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={categoryInput.description} className='form-control'> </textarea>
                                </div>
                            
                                <div className='form-group mb-3'>
                                    <label>Status</label>
                                    <input type="checkbox" id="status" name="status" defaultChecked={chkbx} onChange={handleInput} value={categoryInput.status} /> Status 0 = shown/1=hidden
                                </div>
                                <div className="form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="image" onChange={handleImage} className="form-control" />
                                        <img src={`http://localhost:8000/${categoryInput.image}`} width="50px" alt={categoryInput.name}></img>
                                    </div>
                            </div>
                            <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                                
                                <div className='form-group mb-3'>
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className='form-control' />
                                    <small className="text-danger">{error.meta_tittle}</small>
                                </div>
                                
                                <div className='form-group mb-3'>
                                    <label>Meta Keyword</label>
                                    <textarea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className='form-control'> </textarea>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Meta Description</label>
                                    <textarea name="meta_descrip" onChange={handleInput} value={categoryInput.meta_descrip} className='form-control'> </textarea>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Update</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default EditCategory;