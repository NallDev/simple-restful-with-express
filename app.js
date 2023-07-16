const express = require('express');
const cors = require('cors');

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const db = require('./app/models/')
db.mongoose.connect(db.url).then((result) => {
    console.log('databse connected')
}).catch((err) => {
    console.log('database cannot connect', err)
    process.exit()
});

app.get('/', (req, res) => {
    res.json({
        message: 'Hellow'
    });
});

require('./app/routes/post.routes')(app)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})