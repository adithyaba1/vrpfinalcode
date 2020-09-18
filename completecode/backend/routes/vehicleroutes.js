var VehicleModel = require('../models/vehicleroute');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');

router.post('/', async (req, res) => {
    
});


router.get('/', async (req, res) => {
    try{
        const platforms = await VehicleModel.find(req.body);
        res.send(platforms);
        var veh= "ka003" 
        for(i=0;i<platforms.length;i++){
            if(platforms[i].vehicleNo == veh){
                console.log("Hii",platforms[i])
            }
        }
        }
        catch (err) {
            console.log(err);
        }
    });

    // Delete the data from routes table
    router.delete('/:_id', async (req, res) => {
        try{
            console.log("wwwwwwww")
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