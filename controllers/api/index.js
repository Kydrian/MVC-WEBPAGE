const router = require('express').Router();
const userRoutes = require('./userRoute');
const BlogRoutes = require('./postRoute');
const CommentRoutes = require('./commentRoute');

router.use('/posts', BlogRoutes);
router.use('/comments', CommentRoutes);
router.use('/users', userRoutes);


module.exports = router;
