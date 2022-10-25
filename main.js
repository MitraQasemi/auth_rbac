const routes = require('./routes/routes.js');

const express = require("express");
const app = express();
app.use(express.json());

app.use(routes);

app.listen(3000,()=>{
    console.log("on port 3000")
})