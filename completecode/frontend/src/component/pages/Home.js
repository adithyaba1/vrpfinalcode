import React from "react";
//import { Link } from "react-router-dom";
//import UserContext from "./../context/UserContext";
import '../css/styles.css';
import "../css/font-awesome.css"
import "../css/logvrpfonts.css"
import "../css/flexslider.css"
//import theImage from '../images/bg-header-1.jpg';
export default function Home() {
  //const { userData } = useContext(UserContext);
  

  return (
    <div>
    <div className="bg-slider-wrapper">
    <div className="flexslider bg-slider">
        <ul className="slides">
            <li className="slide slide-1"></li>
            
        </ul>
    </div>
</div>
 <section className="promo section section-on-bg">
 <div className="container text-center">
     <h1 className="title">logvrp, route optimization, fleet planning and scheduling web application and service</h1>
     <p className="intro">plan your delivery, distribution, pick up, collection tasks<br /> with optimum vehicle routes and schedules</p>
     
     
 </div>
</section>
</div>
  );
}