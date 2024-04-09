const express = require("express");
const { app_port } = require("./config/app-config");
const auth_router = require("./routes/auth-route");
const prod_router = require("./routes/product-router");
const { createAdmin } = require("./utils/create-admin-user");
const stock_router = require("./routes/stock-router");
const cors = require("cors");
const app = express();
const port = app_port || 4000;

app.use(express.json());
app.use(cors());
app.use("/api/v1/", auth_router);
app.use("/api/v1", prod_router);
app.use("/api/v1", stock_router);
app.listen(port, async () => {
  await createAdmin();
  console.log("Server listening on port", port);
});
