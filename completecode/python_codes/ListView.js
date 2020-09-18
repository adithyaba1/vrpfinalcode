import React from "react";
import './style.css';
//import {Table} from 'react-bootstrap';
//import AddTrip from './AddTrip';

class ListView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //dept:[], 
      deps:[],
      addBookShow : false,
      addShow:false
      }
    }
  componentDidMount(){
  
    fetch('http://localhost:4000/api/stat/')
    .then(response=>response.json())
    .then(data => {
        this.setState({deps:data});
        //console.log("data",data[0].routeforvehicle);
        //console.log(data.routeforvehicle[{lat:Number,lng:Number}]);
    })
}
  add(){
    alert("hi");
  }
/* renderTableData() {
    return this.state.deps.map((depts, index) => {
    const {routeforvehicle } = depts
       return (
          <tbody>
             {routeforvehicle.map((student) => (
               <tr key={student.lat}>
                 <td>{student.lat}</td>
                 <td>{student.lng}</td>
               </tr>
             ))}
          </tbody>
       )
    })
  }*/
    render() {
     //const{dept} = this.state;
      const{deps} = this.state;
     /* {deps.map(route=>{
        return(route.routeforvehicle.map(routevehicle=>{
          console.log(routevehicle);
        }))
      })}*/
      
        //let addBookClose=()=>this.setState({addBookShow:false});
      return (
        <div className="panelcb">
               <div>
                <div className="second2">
                    <div className="x-grid3-header">
               <table className="grid3">
                 <thead>
                   <tr>
                     <td  style={{width:"100px"}}>vehicleNo</td>
                     <td  style={{width:"200px"}}>Distance</td>
                     <td  style={{width:"120px"}}>Totaldistance</td>
                     <td  style={{width:"180px"}}>Timerequired</td>
                     <td  style={{width:"100px"}}>Total_Time</td>
                     <td  style={{width:"60px"}}>routes</td>
                     </tr>
                 </thead>
                
                 {deps.map((dep) => {
    const {vehicleNo,Distanceforeachlocation,Totaldistanceforroute,Timerequiredtotravelforeachlocation, Total_Time,routeaddress} = dep 
       return (
          <tbody>
             <tr>
             <td>
             <button  style={{"border-radius":"10px"}}>{vehicleNo}</button></td>
              <td>{Distanceforeachlocation}</td>
               <td>{Totaldistanceforroute}</td>
               <td>{Timerequiredtotravelforeachlocation}</td>
               <td>{Total_Time}</td>
               <td>{routeaddress}</td>
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

export default ListView;