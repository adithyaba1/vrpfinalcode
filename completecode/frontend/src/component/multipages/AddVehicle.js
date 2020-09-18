import React from 'react';
import {Modal,Form,Col,Row,Button} from 'react-bootstrap';
//import Snackbar from '@material-ui/core/Snackbar';
//import IconButton from '@material-ui/core/IconButton';
//import './style.css';

class AddVehicle extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      snackbaropen: false,
      snackbarmsg: ''
    };
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  snackbarClose=(event)=>{
    this.setState({snackbaropen:false});
  }

  handleSubmit(event){
    event.preventDefault();
    fetch('http://localhost:5000/api/lib',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
        
        vechicleNumber:event.target.vechicleNumber.value,
        Latitude: event.target.Latitude.value,
        Longitude: event.target.Longitude.value,
        vechiclecapacity:event.target.vechiclecapacity.value,
        driverName: event.target.driverName.value,  
      })
    })
    .then(function (response) {
      //setTimeout(() => window.location.reload(), 5000);
      //console.log(response);
      alert("added successfully");
    })
    .catch(function (error) {
        console.log(error);
    });   
  }

  render() {
    return (
    <div className="container">
      <Modal
        {...this.props}
        size="lm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton className="bodypanel">
        <Modal.Title id="contained-modal-title-vcenter">
          Add
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="container">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formHorizontalEmail" style={{border: "1px solid #f5eff100"}}>
            <Form.Label column sm={3}>
              vechicleNumber:
            </Form.Label>

            <Col sm={8}>
              <Form.Control type="text" name="vechicleNumber"
              required
              placeholder="vehicleNumber" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail" style={{border: "1px solid #f5eff100"}}>
          <Form.Label column sm={3}>
          startposition:
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="text" name="Latitude"
            required
            placeholder="latitude" />
          </Col>
          <Col sm={4}>
            <Form.Control type="text" name="Longitude"
            required
            placeholder="longitude" />
          </Col>

          </Form.Group>


          <Form.Group as={Row} controlId="formHorizontalEmail" style={{border: "1px solid #f5eff100"}}>
            <Form.Label column sm={3}>
              vechiclecapacity:
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="vechiclecapacity"
                required
                placeholder="vehiclecapacity" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail" style={{border: "1px solid #f5eff100"}}>
            <Form.Label column sm={3}>
              Driver Name:
            </Form.Label>
            <Col sm={4}>
              <Form.Control type="text" name="driverName"
              required
              placeholder="Driver Name" />
            </Col>
          </Form.Group>

<br></br>
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

export default AddVehicle;