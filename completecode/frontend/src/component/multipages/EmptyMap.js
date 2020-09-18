import React from "react";
//import './style.css';
import { Link } from 'react-router-dom';
import { DropdownButton,Dropdown} from 'react-bootstrap';

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = { show: true };

        this.toggleDiv = this.toggleDiv.bind(this);
    }

    toggleDiv = () => {
        const {show} = this.state;
        this.setState ({show : show})
    }


  render() {
    return (
     <div className="">
       <div className="">
         <div className="Col">
           <div className="Row">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <DropdownButton variant="outline-secondary" title="Select View" id="input-group-dropdown-1">
                          <Dropdown.Item href ="/mapview">Map View</Dropdown.Item>
                          <Dropdown.Item href ="/listview">List View</Dropdown.Item>
                          </DropdownButton>
                        </td>
                        
                      </tr>
                    </tbody>
                  </table>
           </div>
           </div>         
         
     </div>
     </div>
    
    );
  }
}

export default Header;