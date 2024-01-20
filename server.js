import express from 'express';
import path from 'path';
const app = express();
const PORT = 3000;

app.use(express.static(path.join(process.cwd(), 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
