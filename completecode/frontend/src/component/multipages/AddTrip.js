import React from 'react';
import {Modal,Row,Col,Button,Form} from 'react-bootstrap';
//import '../css/addtrip.css';
import theImage from './images/plus.png';
import theImage1 from './images/delete.png';


// Class Component
class AddTrip extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        deps:[],
        addShow:false,
        users: [{Noofpeople: ""}, {Pickuploc: ""}]
      };       
      this.handleSubmit=this.handleSubmit.bind(this);
  }
   
  // Call handleSubmit function when we add all trip details and clicked on add button
  handleSubmit(event){
    event.preventDefault();
    // Put No of ppl and Pickup Location in an array
    let Noofpeopl = [];
    let Pickuplocatin = [];
    for(var i=0;i<this.state.users.length;i++){
      Noofpeopl.push(event.target.Noofpeople[i].value);
    }
    for(var j=0;j<this.state.users.length;j++){
      Pickuplocatin.push(event.target.Pickuploc[j].value);
    }
    
    // Insert fetch details into trips table in mongoDB
    fetch('http://localhost:5000/api/vtrip',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
        Tripname:event.target.Tripname.value,
        Hour:event.target.Hour.value,
        Minute:event.target.Minute.value,
        Noofpeople:Noofpeopl,
        Pickuploc:Pickuplocatin,
        Endlocation:event.target.Endlocation.value,
      })
    })
    .then(res=>res.json())
    .then((result)=>
    {
      alert("added successfully");
    },
      (error)=>{
          alert('failed');
          throw(error);
      }
    )   
  }

  // Call fetchDropDownData
  componentDidUpdate(){
    this.fetchDropDownData();
  }

  // Fetch location name from addresses table
  fetchDropDownData(){
    fetch('http://localhost:5000/api/station/')
    .then(response=>response.json())
    .then(data => {
        this.setState({deps:data});
    })
        
  }
  
  // Call addClick function when we click on + button to add more pickup locations
  addClick(){
    this.setState(prevState => ({ 
      users: [...prevState.users, { Noofpeople: "", Pickuploc: "" }]
    }))
  }
  
  // Call createUI function when we fill trip details and click on add button
  createUI(){
    return this.state.users.map((el, i) => (
      <div key={i}>
        <Form.Group as={Row} controlId="formHorizontalEmail" style={{border: "1px solid #f5eff100"}} size="sm">
          <Form.Label column sm={3} >
            No of people to pickup:
          </Form.Label>
          <Col sm={2}>
            <Form.Control type="text" name="Noofpeople" size="sm"
              required
              placeholder="name of the trip"
              onChange={this.handleChange.bind(this, i)} />
          </Col>

          <Form.Label>
            pickup location:
          </Form.Label>
          <Col>
            <Form.Control as="select" name="Pickuploc" size="sm"
              onChange={this.handleChange.bind(this, i)}>
              <option> select  </option>
              {this.state.deps.map((dep) => <option key={dep._id} address={dep.address}>{dep.address}</option>)}
            </Form.Control>
          </Col>

          {i===0?<button onClick={this.addClick.bind(this)}><img src={theImage} alt="img"/></button>
          :<button
          onClick={this.removeClick.bind(this, i)}><img src={theImage1} alt="img"/></button>}
        </Form.Group>
      </div>          
    ))
  }
  
  handleChange(i, e) {
     const { name, value } = e.target;
     let users = [...this.state.users];
     users[i] = {...users[i], [name]: value};
     this.setState({ users });
  }
  
  // Call removeClick function when we click on remove pickup button
  removeClick(i){
     let users = [...this.state.users];
     users.splice(i, 1);
     this.setState({ users });
  }
  
  
  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="bodypanel">
            <Modal.Title id="contained-modal-title-vcenter">
              Trip Details:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="formHorizontalEmail" style={{border: "1px solid #f5eff100"}} size="sm">
                <Form.Label column sm={3} >
                  Name of the trip:
                </Form.Label>
                <Col sm={5}>
                  <Form.Control type="text" name="Tripname" size="sm"
                    required
                    placeholder="name of the trip" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalPassword"  style={{border: "1px solid #f5eff100"}} size="sm">
                <Form.Label column sm={3}>
                  start time of the trip:
                </Form.Label>
                <Col sm={1}>
                  <Form.Control type="text"  name="Hour"
                    size="sm"
                    required
                    placeholder="00" />
                  </Col>:
                <Col sm={1}>
                  <Form.Control type="text"  name="Minute"
                  size="sm"
                  required
                  placeholder="00" />
                </Col>
              </Form.Group>

              <div>{this.createUI()}</div>

              <Form.Group as={Row} controlId="formHorizontalEmail" style={{border: "1px solid #f5eff100"}} size="sm">
                <Form.Label column sm={3}>
                  End Location:
                </Form.Label>
                <Col sm={5}>
                <Form.Control as="select" name="Endlocation" size="sm">
                  <option> select  </option>
                  {this.state.deps.map((dep) => <option key={dep._id} address={dep.address}>{dep.address}</option>)}
                </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group as={Row} style={{border: "1px solid #f5eff100"}}>
                <Col sm={{ span: 20, offset: 5}}>
                  <Button type="submit">add</Button>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
export default AddTrip;

