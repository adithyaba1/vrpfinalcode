import React from "react";
import './style.css';
//import { Link } from 'react-router-dom';
//import { DropdownButton,Dropdown} from 'react-bootstrap';
import Map from './Map';

class Emptymap extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
          value: ' ',
          show :true
         };

        this.toggleDiv = this.toggleDiv.bind(this);
    }

    toggleDiv = () => {
        const {show} = this.state;
        this.setState ({show : show})
    }
    change = (event) =>{
      this.setState({value: event.target.value});
  }

  render() {
    return (
     <div>
        <select id="lang" onChange={this.change} value={this.state.value}>
              <option></option>
              <option value="select">Map</option>
              
           </select>
           <p>{this.state.value === "select" && <Map></Map>}</p>
    </div>
         
    );
  }
}

export default Emptymap;