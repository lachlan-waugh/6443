import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const user = {
  fname: 'idk',
  lname: 'lol',
  username: 'melon',
  password: 'Hunter2',
  mobile: 12345678,
  city: 'Sydney',
}

app.get('/', (_, res) => res.end(fs.readFileSync('./index.html')));

app.post("/update", (req, res) => {
  let userData = req.body; // User-controlled input

  let user = Object.assign({}, userData);

  res.json({ message: "User updated", user });
});

app.listen(3001, () => console.log("🚀 Server running on http://localhost:3001"));
