var mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose);
//var ObjectId = require('mongodb').ObjectID;



var stationSchema = mongoose.Schema({
    vechicleNumber: {type:String},
    Latitude:{type:Number},
    Longitude:{type:Number},
    vehicle_address: {type:String},
    vechiclecapacity:{type:Number},
    driverName:{type:String},

    
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
}
);



module.exports = mongoose.model("vehicleLocationNname", stationSchema)