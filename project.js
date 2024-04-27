var express = require('express');
var app = express();

app.use(express.static('public'));

function isValidUnixTimestamp(timestamp) {
    if (typeof timestamp !== 'number' || timestamp < 0) {
        return false;
    }
    
    const maxUnixTimestamp = Math.pow(2, 31) - 1;
    if (timestamp > maxUnixTimestamp) {
        return false;
    }
    
    return true;
}
app.use(express.static("./public"));

app.get("/", function (req, res) {
    res.send("index.html");
});

app.get("/api/:date?", function (req, res) {
    const {date} = req.params;
    const numdate =  Number(date);
    const valid = isValidUnixTimestamp(Math.floor(numdate / 1000));
    
    if(numdate && valid){
    const real = new Date(numdate).toUTCString();
    res.json({"unix":numdate,"utc":real});
    }
    else if(!numdate){
    const real = new Date().toUTCString();
    res.json({"utc" : real});
    }
    else{
    res.json({ error : "Invalid Date" });
    }
});



var listener = app.listen(process.env.PORT || 5000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
