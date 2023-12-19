const mongoose = require("mongoose");
require('dotenv').config({path: './config/.env'});

mongoose
  .connect(`mongodb+srv://${process.env.MONGOPASSWORD}@clusterpadel.pxp1ave.mongodb.net/`,
  // {
  //   userNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false
  // }
  )
  .then(()=> console.log('Connected to MongoDB'))
  .catch((err)=> console.log("Failed to connect to MongoDB", err));