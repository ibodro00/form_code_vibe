const express = require("express");
const path = require("path");
const app = express();
const buildPath = path.join(__dirname, "..", "build");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(buildPath));

app.post("/", (req, res) => {
  const uuid = uuidv4();
  const write = fs.createWriteStream(req.body.name + req.body.lastname + uuid + ".txt");
  const array = [];
  for (let key in req.body) {
    array.push({
      id: key,
      elements: req.body[key],
    });
  }
  array.map((element) =>
    write.write(String(element.id) + ":" + String(element.elements) + "\n")
  );
  res.json("OK");
});

app.listen(port, () => {
  console.log("server start on port " + port);
});
