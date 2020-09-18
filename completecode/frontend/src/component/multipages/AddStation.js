import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Modal,Form,Col,Row,Button} from 'react-bootstrap';
//import '../css/addstation.css'

// React class component
class AddStation extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fields: {
        Latitude: '',
        Longitude: '',
        capacity:''
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Call handleChange function when you adding lat,long and capacity
  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }


  // Insert the lat, lng and capacity to employees table mongoDB
  handleSubmit(event){
    console.log("aaaa",1111)
    event.preventDefault();
    fetch('http://localhost:5000/api/station/',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        Latitude:event.target.Latitude.value,
        Longitude:event.target.Longitude.value,
        capacity: event.target.capacity.value,
      })
    })

    .then(function (response) {
      console.log("bbbb",2222)
      alert("added successfully");
    })
    .catch(function (error) {
        console.log(error);
    });   
  }


  render() {
    console.log("I am inside add station")
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >

          <Modal.Header className="btn btn-outline-primary" closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="container">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="formHorizontalEmail" style={{border: "1px solid #f5eff100"}}>
                <Form.Label column sm={3}>
                  Location:
                </Form.Label>
                <Col sm={4}>
                  <Form.Control type="text" name="Latitude"
                    value={this.state.fields.Latitude}
                    required
                    placeholder="latitude"
                    onChange={this.handleChange}
                  />
                </Col>

                <Col sm={4}>
                  <Form.Control type="text" name="Longitude"
                    value={this.state.fields.Longitude}
                    required
                    placeholder="longitude"
                    onChange={this.handleChange} />
                </Col>
              </Form.Group>


              <Form.Group as={Row} controlId="formHorizontalEmail" style={{border: "1px solid #f5eff100"}}>
                <Form.Label column sm={3}>
                  capacity:
                </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" name="capacity"
                      required
                      placeholder="capacity" />
                  </Col>
              </Form.Group>

              <Form.Group as={Row} style={{border: "1px solid #f5eff100"}}>
                <Col sm={{ span: 20, offset: 5 }}>
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

export default AddStation;