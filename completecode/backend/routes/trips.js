var TripModel = require('../models/trip');
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Receive all data from frontend
router.post('/', async (req, res) => {
    // First Validate The Request
    try{
        let book = new TripModel({
            Tripname: req.body.Tripname,
            Hour: req.body.Hour,
            Minute: req.body.Minute,
            Noofpeople: req.body.Noofpeople,
            Pickuploc: req.body.Pickuploc,
            Endlocation: req.body.Endlocation,     
        });

        // Convert End Location to lat,long
        var EndLatLong = []
        let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${book.Endlocation}&key=AIzaSyC_ahW3YTAJC3BaRxW4Fa7QqFXwgB58bWc`)
        var endlocation = response['data']['results'][0]
        console.log("asdfg",endlocation)
        EndLatLong.push(endlocation)

        // Convert pickup address into lat,long and save in database
        var pickupLocation = []
        for(j=0;j<book.Pickuploc.length;j++){
            let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${book.Pickuploc[j]}&key=AIzaSyC_ahW3YTAJC3BaRxW4Fa7QqFXwgB58bWc`)
            var pickup = response['data']['results'][0]
            console.log("123456",pickup)
            pickupLocation.push(pickup)
            //console.log("ploc",pickup)
            }
            let pickuploc = new TripModel({
                Tripname: req.body.Tripname,
                Hour: req.body.Hour,
                Minute: req.body.Minute,
                Noofpeople: req.body.Noofpeople,
                Pickuploc: req.body.Pickuploc,
                pickupLatLng:pickupLocation,
                Endlocation: req.body.Endlocation,
                EndLatLong:EndLatLong
            });
            const result =  pickuploc.save();
            if(result){
                res.status(201).send(result);
                console.log("added trip data");
            }
            else{
                throw "Server Error";
            }
    }

    catch(e){
        res.status(500).send("Server Error");
        console.error(e);
    }
    })

    router.get('/', async (req, res) => {
        try{
            const platforms = await TripModel.find(req.body);
            //console.log("trippss",platforms)
            res.send(platforms);
            }
            catch (err) {
                console.log(err);
            }
        });
        
        router.put('/:id', async (req, res) => {
            
            try
            {
                
            const platform = await StationModel.findByIdAndUpdate(req.params.id, req.body, 
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
            const platform = await TripModel.findByIdAndRemove(req.params._id);
         
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