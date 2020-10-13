const express = require("express");
const path = require("path");
const app = express();
const buildPath = path.join(__dirname, "..", "build");
const fs = require("fs");

app.listen(4000);

app.use(express.json());
app.use(express.static(buildPath));

app.post("/", (req, res) => {
  const write = fs.createWriteStream("output1.txt");
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
