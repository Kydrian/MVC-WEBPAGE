const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
 try{
  const postdata = await BlogPost.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Comment,
        attributes: ['comment_text'],
        }
      ],
    });

    const posts = postdata.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
 } catch (err) {
  res.status(500).json(err);
 }  

});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/dashboard',withAuth, async (req, res) => {

  try{ 
    const postData= await User.findAll({
      where: { id: req.session.user_id }
    }, 
    {
      include: [{model: Comment,
      attributes: ['comment_text'],
      }
    ]
    });


  const posts = postData.map((post) => post.get({ plain: true }));

 res.render('dashboard', {
  posts,
  logged_in: req.session.logged_in
});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;