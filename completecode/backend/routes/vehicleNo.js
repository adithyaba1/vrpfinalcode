var VehicleModel = require('../models/vehicleroute');
var vehicleNo = require('../models/vehicleNo')
const express = require('express');
const router = express.Router();
const axios = require('axios');
const xml2js = require('xml2js');

router.post('/', async (req, res) => {
    const data = req.body
    console.log("bhima",req.body.title)
        try{
            const platforms = await VehicleModel.find(req.body);
            console.log("rama",platforms)
            //res.send(platforms);
            var veh= req.body.title 
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


module.exports = router;