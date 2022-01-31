const router = require('express').Router();
const sequelize = require('../config/connection');
const { User,Post,Comment} = require('../models');



//to get all posts if exist in DB 
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
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
            //pass post objects to homepage template
            const posts = dbPost.map(post => post.get({
                plain: true
            }));
            //render post to home page
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//to get single post, route to 
router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
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
            if (!dbPost) {
                res.status(404).json({
                    message: 'Post for id does not exists '
                });
                return;
            }

            const post = dbPost.get({
                plain: true
            });

            res.render('single-post', { post,loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Route login
router.get('/login', (req, res) => {
    console.log("router.get ('/login') in file home-routes");
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

//Route to sign up page
router.get('/signup', (req, res) => {
    console.log("router.get ('/signup') in file home-routes");
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

//for logout  add route 
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });
  


router.get('*', (req, res) => {
    res.status(404).send("Page inaccessible!");
    // res.redirect('/');
})


module.exports = router;