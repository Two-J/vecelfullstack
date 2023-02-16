import express, { Request, Response } from "express";
import dotenv from "dotenv";
const app = express();
const port = 3000;

dotenv.config();
const apiUrl = process.env.API_URL;

console.log(apiUrl);
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
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});
app.get("/api", (req: Request, res: Response) => {
  res.send(html);
});
app.get("/api/users", (req: Request, res: Response) => {
  res.send({ name: "nyeinminhtet", email: "nyeinmg@gmailcom", age: 19 });
});

app.listen(port, () => {
  console.log("server is listening", port);
});
