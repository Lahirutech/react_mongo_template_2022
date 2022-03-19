const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")


require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;
app.use(cors());

app.use(express.json());
// app.use(require("./routes/record")); 
// get driver connection
const dbo = require("./db/connection");


//Routes
app.use('/users', require('./routes/users'))

app.get('/foo', function(req, res) {
    res.send("triggered foo")
})

mongoose
    .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log("db Connected"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});