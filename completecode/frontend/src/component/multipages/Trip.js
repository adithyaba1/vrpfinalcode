import React from "react";
//import '../css/trip.css';
import deleteImage from './images/delete.png';
import AddTrip from './AddTrip';


// Class Component
class Trip extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      deps:[],
      addBookShow : false,
      addShow:false
    }
  }

  // Call tripsData function to fetch tripname, starttime, no of ppl, pickuplcn and endlocn from trips table mongoDB
  componentDidUpdate(){
    this.tripsData();
  }

  // Fetch data from trips table
  tripsData(){  
    fetch('http://localhost:5000/api/vtrip/')
        .then(response=>response.json())
        .then(data => {
            this.setState({deps:data});
        })
        console.log("fetched")
  }

  // Delete the front-end trip values
  deleteTrip(depid) {
    if(window.confirm('Are you sure?')){
      fetch('http://localhost:5000/api/vtrip/'+depid,{
        method:'DELETE',
        header:{'Accept':'application/json',
        'Content-Type':'application/json'
        }
      })
    }
    else{
      console.log("Unable to delete station")
    }
  }
  
  render() {
    const{deps} = this.state;
    let addBookClose=()=>this.setState({addBookShow:false});
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
                    <button className="btn btn-outline-primary btn-sm"style={{"borderRadius":"10px"}}  onClick={()=>this.setState({addBookShow:true})}>AddTrip</button>
                    <AddTrip show={this.state.addBookShow} onHide={addBookClose}/>
                  </td>   
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <div className="second2">
            <div className="x-grid3-header">
              <table className="grid3">
                <thead>
                  <tr>
                    <td  style={{width:"100px"}}>Trip Name</td>
                    <td  style={{width:"100px"}}>start time</td>
                    <td  style={{width:"120px"}}>no of people</td>
                    <td  style={{width:"200px"}}>Endlocation</td>
                    <td  style={{width:"60px"}}>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {deps.map(dep=>
                  <tr key={dep._id}>
                    <td>{dep.Tripname}</td>
                    <div><tr>
                      <td>{dep.Hour}h</td>
                      <td>{dep.Minute}m</td>
                    </tr></div>
                    <td>{dep.Noofpeople}</td>
                    <td>{dep.Endlocation}</td>
                    <td>
                      <button style={{color:'red'}} onClick={()=> this.deleteTrip(dep._id)}><img src={deleteImage} alt="img"/></button>
                    </td>   
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>    
      </div>
    );
  }
}

export default Trip;

