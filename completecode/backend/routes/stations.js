var address = require('../models/employee');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');

 
router.post('/', async (req, res) => {
   console.log("123456",req)
    // First Validate The Request
    try{
        let book = new address({
            Latitude: req.body.Latitude,
            Longitude: req.body.Longitude,
            capacity:req.body.capacity,     
        });
        // Get the address from lat,long
        axios.get(`http://maptile.suveechi.com/nominatim/reverse.php?format=xml&lat=${book.Latitude}&lon=${book.Longitude}&zoom=18&addressdetails=0&email=map@suveechi.com`)
        .then(response => {
        //var addresses = response['data']['results'][0]['formatted_address']
        //console.log("aaaaadata",response['data']);
        // convert XML to JSON
        
        xml2js.parseString(response['data'], (err, result) => {
        if(err) {
            throw err;
        }

    // `result` is a JavaScript object
    // convert it to a JSON string
    const json = JSON.stringify(result);

    // log JSON string
    //console.log("json_address_cc",result.reversegeocode.result[0]._);
    var addresses = result.reversegeocode.result[0]._;
    console.log("pddddd",typeof(result.reversegeocode.result[0]._))
    // Change long address to short address
    addresses = addresses.split(',').slice(0,3)
    addresses = JSON.stringify(addresses);
    addresses = addresses.replace(/"([^"]+(?="))"/g, '$1');
    addresses = addresses.replace(/[\[\]']+/g,'')
    console.log("yyyy",addresses)
    let adrss = new address({
        Latitude: req.body.Latitude,
        Longitude: req.body.Longitude,
        address: addresses,
        capacity:req.body.capacity
    });
    const results =  adrss.save();
    if(results){
        res.status(201).send(result);
        console.log("added successfully");
        
    }
    else{
        throw "Server Error";
    }
    
    });
        
        })
        .catch(error => {
        console.log(error);
        });
    
    }
    catch(e){
        res.status(500).send("Server Error");
        console.error(e);
    }
});



// Get station data from employee table
router.get('/', async (req, res) => {
try{
    const platforms = await address.find(req.body);
    res.send(platforms);
    }
    catch (err) {
        console.log(err);
    }
});

router.put('/:id', async (req, res) => {
    
    try
    {
        
    const platform = await address.findByIdAndUpdate(req.params.id, req.body, 
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
    const platform = await address.findByIdAndRemove(req.params._id);
 
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
