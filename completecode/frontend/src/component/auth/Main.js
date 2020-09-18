import React from 'react';
import Map from '../multipages/Map';
import Header from '../multipages/Header';
import Emptymap from '../multipages/EmptyMap';
//import ListView from './component/ListView';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style12.css';

import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { Button } from 'react-bootstrap';
//import ShelterMap from './component/ShelterMap';
//import MapContainer from './component/MapContainer';


class Main extends React.Component {


  render() {
    return (
  <div>
    <SplitterLayout>
       <div className="firstleft">
          <div className="head1"> <h4>Welcome to VRP</h4></div>
          <Router>
            <Header/>
            <br/>
          </Router>
          </div>
        <div className="secondright">
        <Router>
           <Route path="/" component={Emptymap}></Route>
           <Route path="/map" component={Map}></Route>
          
            
            
        </Router>
          </div>
          </SplitterLayout>
      </div >
    );
  }

}
export default Main;