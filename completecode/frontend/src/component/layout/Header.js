import React from "react";
import AuthOptions from "../auth/AuthOptions";
import '../pages/style.css';
//import logvrp from '../images/suveechi.jpg';

export default function Header() {
  return (
    <div>
    <header id="header">
        <h1 className="title">Vehicle Routing Problem</h1>
      <AuthOptions />
    </header>
    </div>
  );
}