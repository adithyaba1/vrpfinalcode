import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
//import '../css/station.css';
import AddStation from './AddStation';
import deleteImage from './images/delete.png';
import editImage from './images/edit.png';

//Class component
class Station extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      deps:[],
      addShow : false,
    }
  }

  //Call stationData function to fetch address table data from mongoDB
  componentDidUpdate(){
    this.stationData();
  }

  // Fetch location name and capacity from address table mongoDB
  stationData(){
    fetch('http://localhost:5000/api/station/')
      .then(response=>response.json())
      .then(data => {
        this.setState({deps:data});
        })
  }

  // Delete the front-end station values
  deleteStation(depid) {
    if(window.confirm('Are you sure?')){
      fetch('http://localhost:5000/api/station/'+depid,{
        method:'DELETE',
        header:{'Accept':'application/json',
        'Content-Type':'application/json',
        }
      })
    }
    else{
      console.log("Unable to delete station")
    }
  }

  render() {
    const{deps} = this.state;
    let addClose=()=>this.setState({addShow:false});
    console.log("I am add show")
    return (
      <div className="panelcb">
        <div className="row">
          <div className="col">
            <div>
              -
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col"> 
            <table >
              <tbody>
                <tr>
                  <td>
                    <button className="btn btn-outline-primary btn-sm" onClick={()=>this.setState({addShow:true})}>Add</button>
                    <AddStation show={this.state.addShow} onHide={addClose}/>
                  </td>
                </tr>
              </tbody>
            </table> 
          </div>
        </div>

        <div>
          <div className="x-grid3-header">
            <table className="grid3">
              <thead>
                <tr>
                  <td style={{width:"160px", margin: "50px", padding: "5px"}}>Location</td>   
                  <td style={{width:"100px", margin:"50px",padding:"5px"}}>capacity</td>
                  <td style={{width:"100px", margin:"50px",padding:"5px"}}>Action</td>
                </tr>
              </thead>

              <tbody>
                {deps.map(dep=>
                  <tr  key={dep._id}>
                    <td>{dep.address}</td>
                    <td>{dep.capacity}</td>
                    <td>
                    <button style={{color:'red'}} onClick={()=> this.deleteStation(dep._id)}><img src={editImage} alt="img"/></button>
                      <button style={{color:'red'}} onClick={()=> this.deleteStation(dep._id)}><img src={deleteImage} alt="img"/></button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Station;