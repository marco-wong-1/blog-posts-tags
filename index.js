const express = require('express');
const app = express();
const cache = require('./middleware/cache');
const PORT = process.env.PORT || 5000;


app.set('json spaces', 2);
app.use('/api/ping', require('./routes/api/ping'));
app.use('/api/posts', cache(10), require('./routes/api/posts'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;