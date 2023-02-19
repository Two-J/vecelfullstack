import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import formidable from "formidable";
const app = express();
const port = 3000;

dotenv.config();
const apiUrl = process.env.API_URL;
// console.log(apiUrl);
app.use(express.static("public"));

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body>
   <script  >
   localStorage.setItem("apiUrl" ,"${apiUrl}");
   window.location.href = "/"
   </script>
  </body>
</html>
`;

app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});
app.get("/api", (req: Request, res: Response) => {
  res.send(html);
});
app.get("/api/users", (req: Request, res: Response) => {
  res.send({ name: "nyeinminhtet", email: "nyeinmg@gmailcom", age: 19 });
});

app.post("/api/upload", (req: Request, res: Response) => {
  const name = uuidv4();
  // const fileType = req.header["content-type"].split("/")[1];

  // const writeStream = fs.createWriteStream(`${name}.${fileType}`);
  // req.pipe(writeStream);
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
      res.end(String(err));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ fields, files }, null, 2));
  });
});

app.listen(port, () => {
  console.log("server is listening", port);
});
