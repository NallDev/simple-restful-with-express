const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"));
app.set("view engine", "ejs");

const db = require('./app/models/')
db.mongoose.connect(db.url).then((result) => {
    console.log('databse connected')
}).catch((err) => {
    console.log('database cannot connect', err)
    process.exit()
});

app.get('/', (req, res) => {
    fetch('http://localhost:3000/api/posts/')
        .then((res) => res.json())
        .then((json) => {
            res.render('home.ejs', {
                data: json
            })
        });
});

app.post('/', (req, res) => {
    const id = '64b408ff0e1e2f353a2d1c3a'
    const title = req.body.title
    const body = req.body.body
    const reqBody = {
        title: title,
        body: body,
        published: true,
    }
    fetch(`http://localhost:3000/api/posts/${id}`, {
            method: 'put',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((json) => {
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
        });
});

require('./app/routes/post.routes')(app)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})