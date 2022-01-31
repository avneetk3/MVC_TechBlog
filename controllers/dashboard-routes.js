const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post,User,Comment} = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    Post.findAll({
            where: {
                userId: req.session.userId
            },
            attributes: [
                'id','title','content','created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'commentBody', 'post_id', 'userId', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPost => {
            const posts = dbPost.map(post => post.get({
                plain: true
            }));
            res.render('dashboard', {
                posts,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id','title','content','created_at'],
            include: [{
                    model: Comment,
                    attributes: ['id', 'commentBody', 'post_id', 'userId', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPost => {
            if (!dbPost) {
                res.status(404).json({
                    message: 'Post for id does not exists '
                });
                return;
            }

            const post = dbPost.get({
                plain: true
            });

            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/new', (req, res) => {
    res.render('add-post', {
        loggedIn: true
    })
})

module.exports = router;