const express = require("express");
const app = express();
const dakoku = require("./dakoku.json");
const fs = require("fs");

app.get("/", (req, res)=>{
  res.header("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>打刻王</title>
  </head>
  <body>
    <h1>打刻王</h1>
    <ul>
    <li>${
      dakoku.datas.map((data)=>{
        return data.time + " : [" + data.type + "]"
      }).join("</li><li>")
    }</li>
    </ul>
  </body>
</html>
`)
});

app.post("/taikin", (req, res)=>{
  res.sendStatus(200);
  dakoku.datas.push({
    time: new Date(),
    type: "退勤"
  });
  fs.writeFile("dakoku.json", JSON.stringify(dakoku));
})

app.post("/syukkin", (req, res)=>{
  res.sendStatus(200);
  dakoku.datas.push({
    time: new Date(),
    type: "出勤"
  });
  fs.writeFile("dakoku.json", JSON.stringify(dakoku));
})

app.listen(process.env.PORT || 3000);
