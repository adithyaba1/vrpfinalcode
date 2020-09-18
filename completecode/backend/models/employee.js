var mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose);
//var ObjectId = require('mongodb').ObjectID;



var stationSchema = mongoose.Schema({
    Latitude:{type:Number},
    Longitude:{type:Number},
    address:{type:String},
    capacity:{type:Number},
   

    
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
}
);



module.exports = mongoose.model("employee", stationSchema)