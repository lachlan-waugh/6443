import express, { Request, Response } from 'express';
import { exec } from 'child_process';
import pug from 'pug';

const app = express();
const port = 9999;

app.get('/', (req: Request, res: Response) => {
  // Security is my passion
  const folderQuery = req.query.folder as string | undefined;
  const folder = (folderQuery && folderQuery.includes('rm'))
    ? 'no; cowsay "you have been securitied"'
    : folderQuery;

  if (folder) {
    // Run the command with the parameter the user gives us
    exec(`ls -l ${folder}`, (error, stdout) => {
      const output = error ? error.message : stdout;
      res.send(pug.renderFile('./app/pages/index.pug', { output, folder }));
    });
  } else {
    res.send(pug.renderFile('./app/pages/index.pug', {}));
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
