import React,{useState,useEffect} from "react";
import "../../res/css/OrderManagement.css";
import OrderNav from "../navbars/OrderNav.js";
import "../../res/css/inv-pages.css"
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllProducts() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:9000/product/getAll")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  });
    return (
        <>
        <OrderNav/>
        <div className="page">
        <div className="shadow-lg p-3 mb-5 mx-5 bg-body rounded">
                    <form>
                        <input className="rounded-pill ps-2 mx-5" type="text" placeholder="Search Products"
                          onChange={(e) => setSearch(e.target.value)}></input>
                        </form>
        </div>
            <div class="cards">
  
  {data.filter((singleData) => {
                return search.toLowerCase() === ''
                  ? singleData
                  : singleData.name.toLowerCase().includes(search);
              }).map((singleData) => {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(singleData.img.data.data))
        );
        return<div className="card"><img className="card__image" src={`data:image/jpeg;base64,${base64String}`} />
        <div class="card__content">
      <p >
      <Link to={"/viewproduct/"+singleData._id}><a style={{fontSize:"22px",paddingLeft:"0px"}}  class="card__link">{singleData.name}</a></Link>
      </p>
      <p style={{fontSize:'14px',paddingLeft:"16px"}}>
        per 1kg
      </p>
      </div>
      <div class="card__info">
    <p style={{color:'red',fontSize:'22px',paddingLeft:"16px"}}>{singleData.price} LKR</p>
    </div>
      </div>
      })}
  

  
  
</div>
</div>
        </>
    )
}