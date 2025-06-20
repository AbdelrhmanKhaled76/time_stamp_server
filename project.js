var express = require('express');
var app = express();

app.use(express.static("./public"));
app.use(express.static("./views"));

function handleDate(date) {
  const realDate = new Date(date);
  if (!date) {
    const now = new Date();
    return {
      unix: now.getTime(),
      utc: now.toUTCString(),
    };
  } else if (realDate != "Invalid Date") {
    return {
      unix: realDate.getTime(),
      utc: realDate.toUTCString(),
    };
  } else {
    return {
      error: "Invalid Date",
    };
  }
}

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/api/:date", function (req, res) {
  let { date } = req.params;
  /^\d+$/.test(date) ? (date = parseInt(date)) : date;
  res.json(handleDate(date));
});

app.get("/api/", function (req, res) {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

let listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

//its all done
