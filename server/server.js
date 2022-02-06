const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());
// app.use(require("./routes/record")); 
// get driver connection
const dbo = require("./db/connection");


//Routes
app.use('/users', require('./routes/users'))

app.get('/foo', function (req, res) {
    res.send("triggered foo")
})

app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    })
    console.log(`Server is running on port: ${port}`);
});