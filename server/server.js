const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors())
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});