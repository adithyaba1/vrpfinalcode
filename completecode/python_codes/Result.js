import React from "react";
import './style.css';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

class Result extends React.Component{
  constructor(){
    super()
    this.state = {
      deps:[],
      route:[],
      routeForVeh:[],
      timeReqLoc:[]
    }
  }

  componentDidMount(){
    fetch('http://localhost:4000/api/stat/')
    .then(response=>response.json())
    .then(data => {
        this.setState({deps:data});
        console.log("deps","I am adithya");
    })
  }

  showIndRoute(vehicleNo){
    //console.log("VehicleNo",vehicleNo['vehicleNo'])
    fetch('http://localhost:4000/api/stat/')
    .then(response=>response.json())
    .then(data => {
        console.log("data",data.length)
        for(var i=0;i<data.length;i++){
          if(vehicleNo['vehicleNo'] === data[i].vehicleNo){
            console.log("ram",data[i]['Timerequiredtotravelforeachlocation'])
            //console.log("I am inside",data[0]['routeaddress'])
            this.setState({route:data[i]['routeaddress']});
            this.setState({routeForVeh:data[i]['Distanceforeachlocation']})
            this.setState({timeReqLoc:data[i]['Timerequiredtotravelforeachlocation']})
            alert(this.state.route[0])
          }
        }
    })
    this.setState({
      route:this.state.route
  })
  }

  render(){
    const{deps} = this.state;
    return(
      <div>
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
                    <button onClick={()=> this.showIndRoute({vehicleNo})}>{vehicleNo}</button>  
                  </td>
                  <td>{Totaldistanceforroute}</td>
                  <td>{Total_Time}</td>
                </tr>
              </tbody>
          )
        })} 
        <div>
          Route_For_Vehicle
        <h6>{this.state.route}</h6>
        Distance_For_Vehicle
        <h6>{this.state.routeForVeh}</h6>
        Time_Required_For_Each_Loaction
        <h6>{this.state.timeReqLoc}</h6>
        </div>
        </table>
      </div>
    )
  }
}
export default Result