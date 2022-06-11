const express = require('express');
const { exec } = require('child_process');
const pug = require('pug');

const app = express();

// Listen in on root
app.get('/', (req, res) => {
  const folder = req.query.folder;
  if (folder) {
    // Run the command with the parameter the user gives us
    exec(`ls -l ${folder}`, (error, stdout, _) => {
      let output = stdout;
      if (error) {
        // If there are any errors, show that
        output = error; 
      }
      res.send(
        pug.renderFile('./pages/index.pug', {output: output, folder: folder})
      );
    });
  } else {
    res.send(pug.renderFile('./pages/index.pug', {}));
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${3000}`);
});