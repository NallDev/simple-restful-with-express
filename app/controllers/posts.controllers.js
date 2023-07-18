const db = require('../models')
const Post = db.posts

exports.findAll = (req, res) => {
    Post.find()
    .sort({ counter: -1 })
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error while rerieving data"
        })
    })
}

exports.create = (req, res) => {
    const post = new Post({
        title: req.body.title,
        musicPath: req.body.musicPath,
        imageUrl: req.body.imageUrl,
    })

    post.save(post)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while error when created"
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Post.findById(id)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error while error when find id"
        })
    });
}

exports.updateCounter = (req, res) => {
    const filter = {_id: req.params.id}

    Post.findOneAndUpdate(filter, {$inc: {counter: 1}})
    .then((result) => {
        if(!result) {
            res.status(404).send({
                message: `${req.body}`
            })
        } else {
            res.send({
                message:"data was updated"
            })
        }
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error when update data"
        })
    });
}

exports.update = (req, res) => {
    const filter = {_id: req.params.id}

    Post.findOneAndUpdate(filter, req.body)
    .then((result) => {
        if(!result) {
            res.status(404).send({
                message: `${req.body}`
            })
        } else {
            res.send({
                message:"data was updated"
            })
        }
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error when update data"
        })
    });
}

exports.delete = (req, res) => {
    const id = req.params.id

    Post.findByIdAndRemove(id)
    .then((result) => {
        if(!result) {
            res.status(404).send({
                message: "Data not found"
            })
        } else {
            res.send({
                message: "Data was deleted"
            })
        }
    }).catch((err) => {
        res.status(409).send({
            message: err.message || "Some error when delete data"
        })
    });
}