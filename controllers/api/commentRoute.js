const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require( '../../utils/auth.js');

router.get('/', async (req, res) => {
        try {
            const commentData = await Comment.findAll();
            res.status(200).json(commentData);
        } catch (err) {
            res.status(400).json(err);
        }
    });


router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.get('/form.:postID', async (req, res) => {
    try {
      const postID = req.params.postID;
      const userID = req.session.user_id;

      res.render('commentForm',
        { postID, userID });

    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  module.exports = router;
