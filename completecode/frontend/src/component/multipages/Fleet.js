import React from "react";
//import './style.css';
//import {Table} from 'react-bootstrap';
import AddVehicle from './AddVehicle';
import deleteImage from './images/delete.png';
import editImage from './images/edit.png';


//import MapConatiner from "./MapContainer";
//import { Link } from 'react-router-dom';
//import MapContainer from './MapContainer';



class Fleet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      deps:[], 
      
      addBook : false,
      }

    
  }
  componentDidUpdate(){
    this.refreshList();
}
refreshList(){
  
fetch('http://localhost:5000/api/lib/')
    .then(response=>response.json())
    .then(data => {
        this.setState({deps:data});
    })
}

editFleet(){
  alert("Do you want to edit")
}


deleteStation(fleetid) {
  if(window.confirm('are you sure?')){
    fetch('http://localhost:5000/api/lib/'+fleetid,{
      method:'DELETE',
      header:{'Accept':'application/json',
      'Content-Type':'application/json'
    }
    })
  }
}

triggerChildAlert(){
  this.refs.child.showAlert();
}

    render() {
     
      const{deps} = this.state;
        let addBookClose=()=>this.setState({addBook:false});
      return (
        <div className="panelcb">
            <div className="row">
           <div className="col">
               -
           </div>

         </div>
         <div className="row">
           <div className="col">
           <table>
                 <tbody>
                   <tr>
                     <td>
                     <button  className="btn btn-outline-primary btn-sm" style={{"border-radius":"10px"}} onClick={()=>this.setState({addBook:true})}>Add Vehicle</button>
                         <AddVehicle show={this.state.addBook} onHide={addBookClose}/>
                     </td>
                    
                   </tr>
                 </tbody>
               </table>

           </div>

         </div>
         
        
        <div className="x-grid3-header">
             
                 <table className="grid3">
                 <thead>
                   <tr>
                    <td  style={{width:"198px"}}>vechicleNumber</td>     
                    <td  style={{width:"150px"}}>vehicle_address</td>    
                    <td  style={{width:"150px"}}>vechiclecapacity</td>    
                    <td  style={{width:"180px"}}>drivername</td>  
                    <td  style={{width:"180px"}}> Action</td>      
                     </tr>
                 </thead>
                 <tbody>
                {deps.map(fleet=>
                <tr  key={fleet._id}>
                <td>
                
                  <button  style={{"border-radius":"10px"}} onClick={this.props.getAlert}>{fleet.vechicleNumber}</button></td>
               
                <td>{fleet.vehicle_address}</td>
                <td>{fleet.vechiclecapacity}</td>
                <td>{fleet.driverName}</td>

                <td>
                <button style={{color:'red'}} onClick={()=> this.editFleet()}><img src={editImage} alt="img"/></button>
                <button style={{color:'red'}} onClick={()=> this.deleteStation(fleet._id)}><img src={deleteImage} alt="img"/></button>

                </td>
                </tr>
                
                )}
                
                
                </tbody>
                
                 </table>
                 
            </div>
         
        </div>
       


      );
    }
}

export default Fleet;