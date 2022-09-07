import React from "react";
import "../../res/css/OrderManagement.css";
import OrderNav from "../navbars/OrderNav.js";
import "../../res/css/inv-pages.css"
import { Link } from "react-router-dom";

export default function ViewProduct() {
    return (
        <>
        <OrderNav/>
        <div className="page">
        <div class="row">
  <div class="column" style={{paddingTop:'50px'}}>
  <img class="img_view" src={require("../../res/images/Fish/fish1.jpeg")} alt=""></img>
  </div>
  <div class="column" style={{paddingTop:'80px'}}>
    <p style={{fontSize:'24px'}}>Thalapath(small)</p>
    <p style={{fontSize:'18px'}}>per 1kg</p>
    <p style={{color:'red',fontSize:'22px'}}>2900.00 LKR</p>
    <form>
        <label style={{fontSize:'20px'}}>Quantity:</label>&nbsp;
        <input style={{width:'40px'}}></input>
        <label style={{fontSize:'20px'}}>Kg </label><br></br><br></br>
        <Link to={"/billproduct"}><button type="submit" class="btn btn-primary">
            Order Now
          </button></Link>
    </form>
  </div>
  </div>
  <br></br>
  <div>
    <h3>Info</h3>
    <p style={{fontSize:'18px',color:'#808080'}}>Fresh thalapath(sailfish)cooked in Lankan spices and condiments pounded in a mortar and pestle for maximum flavor. This fish curry is cooked without coconut milk so you'll definitely feel the heat from this seafood dish.</p>
  </div>
  </div>
        </>
    )
}