const express = require("express");
const expressLoader = require("./loaders/express");

const app = express();

expressLoader(app);

app.listen(3001, () => console.log(`App started on port 3001`));
