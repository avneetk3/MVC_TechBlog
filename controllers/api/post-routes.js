//THis file is created to set routes for posts to create and delete them 

const router = require('express').Router();
const {User,Post,Comment} = require('../../models');
const withAuth = require('../../utils/auth');


// Get all posts
router.get("/", (req, res) => {
    Post.findAll({
            attributes: ["id", "content", "title", "created_at"],
            order: [
                ["created_at", "DESC"]
            ],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "post_id", "userId", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((dbPost) => res.json(dbPost))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a single post
router.get("/:id", (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "content", "title", "created_at"],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "post_id", "userId", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((dbPost) => {
            if (!dbPost) {
                res.status(404).json({
                    message: "Post for id does not exists "
                });
                return;
            }
            res.json(dbPost);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a post
router.post("/", withAuth, (req, res) => {
    console.log("creating");
    Post.create({
            title: req.body.title,
            content: req.body.post_content,
            userId: req.session.userId
        })
        .then((dbPost) => res.json(dbPost))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update a post
router.put("/:id", withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.post_content,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((dbPost) => {
            if (!dbPost) {
                res.status(404).json({
                    message: "Post for id does not exists "
                });
                return;
            }
            res.json(dbPost);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//To delete a post
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((dbPost) => {
            if (!dbPost) {
                res.status(404).json({
                    message: "Post for this id does not exists"
                });
                return;
            }
            res.json(dbPost);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;