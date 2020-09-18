
var mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose);
//var ObjectId = require('mongodb').ObjectID;



var vehicleSchema = mongoose.Schema({
    vehicleNo:{type:String},
    routeforvehicle:[

        {
            lat: Number,
            lng: Number
        }
    ],
    routeaddress:Array,
    Distanceforeachlocation:Array,
    Totaldistanceforroute:{type:String},
    Timerequiredtotravelforeachlocation:Array,
    Total_Time:{type:String}
}
);



module.exports = mongoose.model("route", vehicleSchema)