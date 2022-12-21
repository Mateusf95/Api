const express = require("express");
const sequelize = require("./config/database.js");
const routes = require("./routes/indexRouter.js");
const app = express();

app.use("/api/usuarios", routes);
app.use("/api", routes);
app.use("/api", routes);
app.listen(3000, () => {
    console.log("Server started on port 3000");
})