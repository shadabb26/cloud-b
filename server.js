const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE_ATLAS;
const PORT = process.env.PORT;

mongoose
  .connect(DB)
  .then(() => console.log("DB Connection Sucessfull..."))
  .catch(() => console.log("DB Connection Unsucessfull..."));

app.listen(PORT, () => console.log(`Application Running on PORT: ${PORT}`));

