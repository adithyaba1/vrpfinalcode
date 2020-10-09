import React from 'react'
import MapmyIndia, {MapMarker} from 'react-mapmyindia'
import './test.css'

 
class MyMap extends React.Component {
     render () {
       const p = [[12.9982,77.5530],[13.0055,77.5692],[13.0098,77.5511]]
       console.log((p[0]))
         return (
           <div className="s">
         	<MapmyIndia>
             	<MapMarker  position = {p[0]} style={{color: "red"}} popupContent = {"Place1"} />
               <MapMarker position = {p[1]} popupContent = {"Place2"} />
               <MapMarker position = {p[2]} popupContent = {"Place2"} />
             </MapmyIndia>
             </div>
         )
     }
}

export default MyMap;