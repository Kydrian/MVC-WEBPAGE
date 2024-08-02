const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postData = await BlogPost.findAll({
            include: [{ model: User }, { model: Comment }]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }]
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with that id!' });
        };
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);

    }
});


router.post('/', async (req, res) => {
    try {
        const postData = await BlogPost.create(req.body);
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const postData = await BlogPost.update(req.body, {
            where: {
                id: req.params.id,
            },
        });


        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postData = await BlogPost.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with that id!' });
        };

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        res.render('edit', {
            id
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

router.get('/new/form', async (req, res) => {
    try {
        res.render('Post', {
            id: req.session.user_id
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;