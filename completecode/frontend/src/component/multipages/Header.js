import React from "react";
//import {Table,Row,Col} from 'react-bootstrap';
//import Container from "react-bootstrap/Container";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
// reactstrap components
//import { Row, Col } from "react-boots";
import './style.css';
import Map from './Map';
import Station from "./Station";
import Orders from "./Trip";
import Fleet from "./Fleet";
import Result from "./Result";

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
          deps:[],
          show: true,
          tabType: ' '
         };

        this.toggleDiv = this.toggleDiv.bind(this);
    }

    toggleDiv = () => {
        const {show} = this.state;
        this.setState ({show : show})
    }
   // manage(){
     // alert("hello");
    //}
    handlerSimpleCall = () => {
      //Calling a function of other class (without arguments)
      new Map().renderIcon();
    };
    callApi(){
      fetch('http://localhost:5000/calculateRoute')
    .then(response=>response.json())
    .then(data => {
        this.setState({deps:data});
    })

    }
    toggleMe=(value)=>{
      this.setState({
          tabType:value
      })
    }
  
  render() {


    return (
     <div className="left-side">
       <div className="container">
         <div className="row">
           <div className="col">
                  <table>
                    <tbody>
                      <tr>
                      <button  className="btn btn-primary" type="submit" style={{"border-radius":"5px"}} onClick={this.callApi}>Calculate Routes</button>&nbsp;
                        <td>
                       <button  className="btn btn-primary" type="submit" style={{"border-radius":"5px"}} onClick={()=>this.toggleMe('result')}>Result</button>&nbsp;
                       <button className="btn btn-primary" type="submit" style={{"border-radius":"5px"}} onClick={()=>this.toggleMe('stat')}>stations</button>&nbsp;
                       <button className="btn btn-primary" type="submit" style={{"border-radius":"5px"}} onClick={()=>this.toggleMe('order')}>trip</button>&nbsp;
                       <button className="btn btn-primary" type="submit" style={{"border-radius":"5px"}} onClick={()=>this.toggleMe('flet')}>Fleet</button>&nbsp;
                        </td>
                        
                      </tr>
                    </tbody>
                  </table>
           </div>
           </div>
             {this.state.tabType ==='stat' && <Station></Station>}
              {this.state.tabType==='order' && <Orders></Orders>}
              {this.state.tabType==='flet' && <Fleet></Fleet>}
              {this.state.tabType==='result' && <Result></Result>}
         
     </div>
     </div>

    
    );
  }
}

export default Header;
