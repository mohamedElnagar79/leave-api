const express = require("express");
const app = express();
require("dotenv").config();
const sequelize = require("./config/database");
const cors = require("cors");
const path = require("path");
const routes = require("./config/routes.js");
require("./config/models_associations.js");
require("dotenv").config();

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.port, () => {
      console.log("process ====>  ", process.env.Port);
      console.log(
        `leaves api app is listening at http://localhost:${process.env.Port}`
      );
    });
  })
  .catch((error) => {
    console.log("database connection error ", error);
  });

app.use(cors({}));
app.get("/", (req, res) => {
  res.send(`hello from leaves app`);
});

// end routes
app.use([
  express.json({ limit: "50mb" }),
  express.urlencoded({ extended: false, limit: "50mb" }),
]);
app.use([routes.loginRoute, routes.countryRoute, routes.leaveRoute]);

app.use("/public", express.static(path.join(__dirname, "public")));
// not found middleWare
app.use((req, res) => {
  res.status(404).json({ message: "end point Not Found !" });
});
//error middleWare
app.use((error, req, res) => {
  let status = error.status || 500;
  res.status(status).json({ message: "internal error " + error });
});
