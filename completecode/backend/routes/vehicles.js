var VehicleModel = require('../models/vehicle');
//var vehicleLocationNname = require('../models/vehicle_location_name');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');


 
router.post('/', async (req, res) => {
    console.log("request",req.body)
   
    // First Validate The Request
    try{
        let book = new VehicleModel({
            vechicleNumber: req.body.vechicleNumber,
            Latitude: req.body.Latitude,
            Longitude: req.body.Longitude,
            vechiclecapacity: req.body.vechiclecapacity,
            driverName: req.body.driverName 
        });
// Get the address from lat,long
        axios.get(`http://maptile.suveechi.com/nominatim/reverse.php?format=xml&lat=${book.Latitude}&lon=${book.Longitude}&zoom=18&addressdetails=0&email=map@suveechi.com`)
        .then(response => {
        //var addresses = response['data']['results'][0]['formatted_address']
        console.log("aaaaadata",response['data']);
        // convert XML to JSON
        
        xml2js.parseString(response['data'], (err, result) => {
        if(err) {
            throw err;
        }

    // `result` is a JavaScript object
    // convert it to a JSON string
    const json = JSON.stringify(result);

    // log JSON string
    console.log("json_address_cc",result.reversegeocode.result[0]._);
    var addresses = result.reversegeocode.result[0]._;
    // Change long address to short address
    addresses = addresses.split(',').slice(0,3)
    addresses = JSON.stringify(addresses);
    addresses = addresses.replace(/"([^"]+(?="))"/g, '$1');
    let adrss = new VehicleModel({
        vechicleNumber: req.body.vechicleNumber,
        Latitude: req.body.Latitude,
        Longitude: req.body.Longitude,
        vehicle_address: addresses,
        vechiclecapacity: req.body.vechiclecapacity,
        driverName: req.body.driverName
});
    const results =  adrss.save();
    if(results){
        console.log("added address");
        
    }
    else{
        throw "Server Error";
    }
    
    });
        
        })
        .catch(error => {
        console.log(error);
        });
        //console.log("-------",book);
        //const result = await book.save();
        if(result){
            res.status(201).send(result);
            console.log("added successfully");
            
        }else{
            throw "Server Error";
        }
    
    }
    catch(e){
        res.status(500).send("Server Error");
        console.error(e);
    }
});



    
    // Check if this user already exisits
    // let survey = await Model.findOne({ MobileNo: req.body.MobileNo });
    // if (survey) {
    //     return res.status(400).send('That user already exisits!');
    // } else {
    //     // Insert the new user if they do not exist yet
    //     survey = new Model({
    //         Name: req.body.Name,
    //         MobileNo: req.body.MobileNo,
    //         rating: Number(req.body.rating),
    //         issue: req.body.issue,
    //         issueDetail:req.body.issueDetail
    //     });
    //     await survey.save();
    //     res.send(survey);
    // }





/*router.get('/', async (req, res) => {
        var response = {};
        LibraryModel.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
});*/


router.get('/', async (req, res) => {
try{
    const platforms = await VehicleModel.find(req.body);
    res.send(platforms);
    }
    catch (err) {
        console.log(err);
    }
});

router.put('/:id', async (req, res) => {
    
    try
    {
        
    const platform = await VehicleModel.findByIdAndUpdate(req.params.id, req.body, 
        {
        new: true
    });
 
    if (!platform) {
        return res.status(404).send('That platform ID was not found');
    }
 
    res.send(platform);
   }
   catch(err)
   {
     console.log(err);
   }
});

router.delete('/:_id', async (req, res) => {
    try{
    const platform = await VehicleModel.findByIdAndRemove(req.params._id);
 
    if (!platform) {
        return res.status(404).send('That platform ID was not found');
    }
 
    res.send(platform);
  }
  catch(err)
  {
     console.log(err);
  }
});

module.exports = router;