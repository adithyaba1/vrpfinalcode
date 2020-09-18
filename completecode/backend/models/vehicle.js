var mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose);
//var ObjectId = require('mongodb').ObjectID;



/*var vehicleSchema = mongoose.Schema({
    vechicleNumber: {type: String},
    Latitude: {type: Number},
    Longitude: {type: Number},
    vechiclecapacity: {type: Number},
    Lat: {type: Number},
    Long:{type:Number},
   

    
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
}
);*/

var vehicleSchema = mongoose.Schema({
    vechicleNumber: {type:String},
    Latitude:{type:Number},
    Longitude:{type:Number},
    vehicle_address: {type:String},
    vechiclecapacity:{type:Number},
    driverName:{type:String},

    
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});



module.exports = mongoose.model("vehicle", vehicleSchema)