/*global google*/
import React from 'react'
import  { compose, withProps,withStateHandlers,lifecycle} from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer,Marker,InfoWindow} from 'react-google-maps'

class MyMapContainer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      depts:[],
      directions : [],
    }
  }
   renderIcon = () => {
    //function to be called from default class (without args)
    alert('Function Called Without Argument ');
  };
  

  render() {
  // const depts = this.state.depts;
    var Colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFFFF", "#000000", "#FFFF00", "#00FFFF", "#FF00FF"];

    const DirectionsComponent = compose(
      withProps({
        googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyAHUXNj1CFqeDSNlV3Yz5kcn057Yvg1Ibs",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ width: `100%` }} />,
        mapElement: <div style={{height: `655px`, width: `675px` }}  />,
        
      }),
      withStateHandlers(() => ({
        isOpen: false,
        markerIndex: 0
      }), {
        onToggleOpen: ({ isOpen }) => (mark) => ({
          isOpen: !isOpen,
          markerIndex: mark
        })
      }),


      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount(){
          fetch('http://localhost:5000/api/stat/')
          .then(response => response.json())
          .then(data => {
            this.setState({ depts: data,
            directions: [],});
            console.log("data",data);
      
              {data.map((route,index) => {
                //var map = new google.maps.Map( element, options );
                const directionsService = new google.maps.DirectionsService();     
      
                console.log("route",route);
                const waypoints = route['routeforvehicle'].map(p =>({
                  
                  location: {lat: p.lat, lng:p.lng},
                  
                  stopover: true
              }))
              
              console.log("waypoints",waypoints);
            const origin = waypoints.shift().location;
            const destination = waypoints.pop().location;
            directionsService.route(
              {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: waypoints,
                
              },
            
              (result, status) => {
                console.log(this.state);
                if (status === google.maps.DirectionsStatus.OK) {
                  var direction = this.state.directions.concat(result);
                  console.log(this.state.directions);
      
                  console.log(direction);
                  this.setState({
                    directions: direction,
                    markers: direction
                  });
                    //var leg = direction[0].routes[ 0 ].legs[ 0 ];
                  } else {
                  this.setState({ error: result });
                }
               });
              
            
          })}
          
          })
        }
           
      })
    )(props =>
      <GoogleMap
      defaultZoom={8} defaultCenter={{ lat: 12.9982, lng:77.5530}}
      >
        {props.depts && 
           props.depts.map((marker,index) => {
              return(marker.routeforvehicle.map((mark,index) => {
              var label = " ";
              if(index === 0) {
                label ="S"
              } else if(index === (marker.routeforvehicle.length - 1)) {
                label = "D"
              } else {
                label = index+""
              }
             return(
             <Marker
             position={mark}
             label={label}
             onClick={ ()=> {props.onToggleOpen(mark)} }
             key={index}>
              {props.isOpen && props.markerIndex === mark && 
                   
                            <InfoWindow onCloseClick={props.onToggleOpen}>
                              <div>
                                vehicleNo:{marker.vehicleNo}
                                </div>
                            </InfoWindow>
              }
           </Marker>
            )
            }))
           })

          },
          
         {props.directions &&
        
        props.directions.map((direction,index) => {
          console.log("direction",direction);
          
          return (

        <DirectionsRenderer directions={direction}  key={index}  

        options={{
          
         polylineOptions: {
           strokeColor: Colors[index],
           strokeOpacity: 1.0,
           strokeWeight: 5,


           icons: [{
             icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
             fillColor: Colors[index],
             strokeColor: Colors[index],
             offset: '100%',
             repeat: '100px'
         }]
       },
       
      suppressMarkers:true,
      suppressInfoWindows:true,
      
       //markerOptions:{
       
         //icon: 'https://image.ibb.co/cLwp5n/678111_map_marker_256.png',
         //start:{
         //label:'s'
         //}
         //}   
       //label:label
      // }
       
       }}
   />
   

          )}
 )}
  
      </GoogleMap>
    );
    return (
      <DirectionsComponent 
      />
  )
    
  }
}
export default MyMapContainer;