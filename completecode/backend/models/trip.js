var mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose);
//var ObjectId = require('mongodb').ObjectID;



var stationSchema = mongoose.Schema({
    Tripname:{type:String},
    Hour:{type:Number},
    Minute:{type:Number},
    Noofpeople: Array,
    Pickuploc:Array,
    pickupLatLng:Array,
    Endlocation:{type:String},
    EndLatLong:Array,
   

    
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
}
);



module.exports = mongoose.model("trip", stationSchema)