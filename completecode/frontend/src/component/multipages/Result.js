import React from "react";
//import './style.css';
//import {Modal} from 'react-bootstrap';
import ListView from './ListView';

class Result extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      deps:[],
      addBooShow : false,
      showComponent: false,
      isClicked: false
      }
      
      //this. handleCall=this. handleCall.bind(this);
      //this._onButtonClick = this._onButtonClick.bind(this);
    }
  componentDidMount(){
  
    fetch('http://localhost:5000/api/stat/')
    .then(response=>response.json())
    .then(data => {
        this.setState({deps:data});
        //console.log("data",data[0].routeforvehicle);
        //console.log(data.routeforvehicle[{lat:Number,lng:Number}]);
        console.log("deps",data[0].vehicleNo);
      
    })


  }
  /*handleCall = () => {
    //Calling a function of other class (without arguments)
    new Click().callApi();
  };*/
 
  
    render() {
     
      const{deps} = this.state;
      let addBooClose=()=>this.setState({addBooShow:false});
      const vehicleResults = (result) => {
        console.info('ram',result);
        //console.info('bhim',result.Distanceforeachlocation);
        this.setState({result})
        this.setState({addBooShow:true})
      } 
    
      return (
        <div className="panelcb">
               <div>
                <div className="second2">
                    <div className="x-grid3-header">
               <table className="grid3">
                 <thead>
                   <tr>
                     <td  style={{width:"100px"}}>vehicleNo</td>
                  
                     <td  style={{width:"120px"}}>Totaldistance</td>
                    
                     <td  style={{width:"100px"}}>Total_Time</td>
                
                     </tr>
                 </thead>
                
                 {deps.map((dep) => {
    const {vehicleNo,Totaldistanceforroute, Total_Time} = dep 
       return (
          <tbody>
             <tr>
           
            <td>
           
             <button onClick={() => {
               vehicleResults(dep);
             }}>{vehicleNo}</button>
             <ListView data={this.state.result} show={this.state.addBooShow} onHide={addBooClose}/>
             
            
            </td>
              <td>{Totaldistanceforroute}</td>
              <td>{Total_Time}</td>
              </tr>
              
          </tbody>
       )
    })} 

      
               </table>
               </div>
               </div>
               </div>
               
           </div>
         
        


      );
    }
}
export default Result;