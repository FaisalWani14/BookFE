const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
    res.send({
        message: "Welcome to my express web server."
    });
});

require("./app/routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// const express = require("express");
// const serveStatic = require("serve-static");
// const history = require("connect-history-api-fallback");
// const PORT = process.env.PORT || 5000;

// const app = express();

// app.use(serveStatic(__dirname + "/dist/spa"));
// app.get('/', history(), (req, res) => {
//   res.send("What's up doc ?!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });