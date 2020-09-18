import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import { Modal } from 'react-bootstrap';

class ListView extends React.Component{
  constructor(){
    super()
    this.state = {
    }
  }
  render(){
    //console.log("ppppp",this.props);
    const result = this.props.data || {};
    console.log("result",result.routeaddress)
    return(
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
            <Modal.Body>
              <Stepper orientation="vertical">
              {(result.routeaddress|| [] ).map((mark,index) => {
                console.log("mark",mark)
         let label = (index  === 0) ? 'Start Location' : "";
         label = (!label && result.routeaddress.length - 1  === index) ? 'End Location' : label;
         label = (!label) ? `Pick up ${index}` : label;
           
            return (
              <Step active={true}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{mark}</Typography>

                <Typography>{result.Distanceforeachlocation[index]}</Typography>
                <Typography>{result.Timerequiredtotravelforeachlocation[index]}</Typography>
                 
                </StepContent>
              </Step>
            );
          })}
              </Stepper>
            </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ListView;