import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home(){

    const[loading, setLoading] = useState(true);
    const[popular, setPopular] = useState([]);
    useEffect(()=>{
        let isMounted = true;
        axios.get(`/api/getPopular`).then(res=>{

            if(isMounted){
                if(res.data.status === 200){
                    // console.log(res.data.category);
                    setPopular(res.data.popular);
                    setLoading(false);
                }
            }
        });
        return ()=>{
            isMounted = false;
        }
    },[]);

    if(loading){
        return <h4>Loading Produk ...</h4>
    }
    else{
        var showPopularList = '';
        showPopularList = popular.map((item, idx)=>{
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
            );
        });
    }
    return(
        <div>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src='https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80' className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src='https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80' className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                    </div>
                    </div>
                    <div className="carousel-item">
                        <img src='https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80' className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                    </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
            {/* <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Category Page</h6>
                </div>
            </div> */}
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showPopularList}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;