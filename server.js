import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static(path.join(process.cwd(), 'dist')));

app.use(express.static('./dist'));
app.use('/*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app - http://localhost:${PORT}/`);
});
