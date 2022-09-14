import React from "react";
import "../../res/css/OrderManagement.css";
import OrderNav from "../navbars/OrderNav.js";
import "../../res/css/inv-pages.css"

export default function AllProducts() {
    return (
        <>
        <OrderNav/>
        <div className="page">
        <div className="shadow-lg p-3 mb-5 mx-5 bg-body rounded">
                    <form>
                        <input className="rounded-pill ps-2 mx-5" type="text" placeholder="Search Products"></input>
                        </form>
        </div>
            <div class="cards">
  <div class="card">
    <img class="card__image" src={require("../../res/images/Fish/fish1.jpeg")} alt=""></img>
    <div class="card__content">
      <p >
      <a style={{fontSize:"22px",paddingLeft:"0px"}}  href="/viewproduct" class="card__link">Thalapath(small)</a>
      </p>
      <p style={{fontSize:'14px'}}>
        per 1kg
      </p>
    </div>
    <div class="card__info">
    <p style={{color:'red',fontSize:'22px'}}>2900.00 LKR</p>
    </div>
  </div>
  <div class="card">
    <img class="card__image" src={require("../../res/images/Fish/fish2.jpeg")} alt=""></img>
    <div class="card__content">
      <p >
      <a style={{fontSize:"22px",paddingLeft:"0px"}} href="./" class="card__link">Barumundi</a>
      </p>
      <p style={{fontSize:'14px'}}>
        per 1kg
      </p>
    </div>
    <div class="card__info">
    <p style={{color:'red',fontSize:'22px'}}>2220.00 LKR</p>
    </div>
  </div>
  <div class="card">
    <img class="card__image" src={require("../../res/images/Fish/fish3.jpeg")} alt=""></img>
    <div class="card__content">
      <p >
      <a style={{fontSize:"22px",paddingLeft:"0px"}} href="./" class="card__link">Linna</a>
      </p>
      <p style={{fontSize:'14px'}}>
        per 1kg
      </p>
    </div>
    <div class="card__info">
    <p style={{color:'red',fontSize:'22px'}}>1495.00 LKR</p>
    </div>
  </div>
  <div class="card">
    <img class="card__image" src={require("../../res/images/Fish/fish4.jpeg")} alt=""></img>
    <div class="card__content">
      <p >
      <a style={{fontSize:"22px",paddingLeft:"0px"}} href="./" class="card__link">Paraw</a>
      </p>
      <p style={{fontSize:'14px'}}>
        per 1kg
      </p>
    </div>
    <div class="card__info">
    <p style={{color:'red',fontSize:'22px'}}>3840.00 LKR</p>
    </div>
  </div>
  <div class="card">
    <img class="card__image" src={require("../../res/images/Fish/fish5.jpeg")} alt=""></img>
    <div class="card__content">
      <p >
      <a style={{fontSize:"22px",paddingLeft:"0px"}} href="./" class="card__link">Tuna Fish</a>
      </p>
      <p style={{fontSize:'14px'}}>
        per 1kg
      </p>
    </div>
    <div class="card__info">
    <p style={{color:'red',fontSize:'22px'}}>2880.00 LKR</p>
    </div>
  </div>
  <div class="card">
    <img class="card__image" src={require("../../res/images/Fish/fish6.jpeg")} alt=""></img>
    <div class="card__content">
      <p >
      <a style={{fontSize:"22px",paddingLeft:"0px"}} href="./" class="card__link">Thalapath(Koppara)</a>
      </p>
      <p style={{fontSize:'14px'}}>
        per 1kg
      </p>
    </div>
    <div class="card__info">
    <p style={{color:'red',fontSize:'22px'}}>3560.00 LKR</p>
    </div>
  </div>
</div>
</div>
        </>
    )
}