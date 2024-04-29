var express = require('express');
var app = express();

app.use(express.static("./public"));
app.use(express.static("./views"));

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

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
    const {date} = req.params;
    if(!date){
        const real = new Date().toUTCString();
        res.json({"utc" : real});
    }
    if(isNaN(date)){
        var mdate =  Date.parse(date);
    }
    else {
        mdate = date;
    }
    var numdate =  Number(mdate);
    const valid = isValidUnixTimestamp(Math.floor(numdate / 1000));
    
    if(numdate && valid){
    const real = new Date(numdate).toUTCString();
    res.json({"unix":numdate,"utc":real});
    }
        res.json({ "error" : "Invalid Date" })
});



var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
