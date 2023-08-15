const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// db.once => happen once on start and maintains the connection,
//      if it drops, it will automatically reconnect.
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Social Network API running on port ${PORT}`);
    })
})
