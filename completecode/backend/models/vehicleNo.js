var mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose);
//var ObjectId = require('mongodb').ObjectID;



var stationSchema = mongoose.Schema({
    vehicleNo:{type:String},
   

    
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
}
);



module.exports = mongoose.model("vehicleno", stationSchema)