import express, { Request, Response } from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

interface User {
  fname: string;
  lname: string;
  username: string;
  password: string;
  isAdmin?: string;
}

let user: User = {
  fname: 'idk',
  lname: 'lol',
  username: 'melon',
  password: 'Hunter2',
};

app.get('/', (_, res: Response) => res.sendFile(__dirname + '/site/index.html'));
app.get('/whoami', (_, res: Response) => res.json({ user }));
app.get('/script.js', (_, res: Response) => res.sendFile(__dirname + '/site/script.js'));

app.post('/update', (req: Request, res: Response) => {
  const data: Partial<User> = req.body;

  // Ensure the user doesn't change themselves to admin
  for (const attr in data) {
    if (attr === 'isAdmin' && data[attr] === "True") {
      return res.status(403).json({ message: "You can't change yourself to admin" });
    }
  }

  user = Object.assign({}, user, data);
  console.log(`Debug - user is now: ${user}`);
  res.json({ message: 'User updated', user: user, admin: user.isAdmin });
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
