const express = require("express");
const station = require('./routes/stations');
const vehicle = require('./routes/vehicles');
const vehicleroute = require('./routes/vehicleroutes')
const trips = require('./routes/trips')
const vehicleNo = require('./routes/vehicleNo')
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/station', station);
app.use('/api/lib', vehicle);
app.use('/api/stat', vehicleroute);
app.use('/api/vtrip', trips);
app.use('/api/vehicleno',vehicleNo)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));


mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) throw err;
      console.log("MongoDB connection established");
    }
  );

  app.use("/users", require("./routes/userRouter"));