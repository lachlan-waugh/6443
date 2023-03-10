import express from 'express';
import { exec } from 'child_process';
import pug from 'pug';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  // security is my passion
  const folder = (req.query.folder && req.query.folder.toString().includes('rm'))
    ? 'no; cowsay "you have been securitied"'
    : req.query.folder;

  if (folder) {
    // Run the command with the parameter the user gives us
    exec(`ls -l ${folder}`, (error, stdout, _) => {
      let output = (error) ? error : stdout;
      res.send(pug.renderFile('./pages/index.pug', {output: output, folder: folder}));
    });
  } else {
    res.send(pug.renderFile('./pages/index.pug', {}));
  }
});

app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`); });