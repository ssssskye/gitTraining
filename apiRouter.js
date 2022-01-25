const router = require('express').Router();
const bodyParser = require('body-parser');
const { reply, pageNotFound } = require('./middware');
const { addArticle, getArticleDetail, getArticleList, deleteArticle } = require('./service/articleService');
const { addComment, getComment, deleteComment } = require('./service/commentService');

router.use(bodyParser.json({ type: ['application/json', 'application/**json'] }));


router.get('/', reply((req) => ({
    version: '1.0'
})));


router.post('/addArticle', reply(async (req) => {
    const body = req.body;
    return await addArticle(body);
}));

router.get('/getArticleList', reply(async (req) => {
    const query = req.query;
    return await getArticleList(query);
}));

router.get('/getArticleDetail', reply(async (req) => {
    const query = req.query;
    console.log(query)
    return await getArticleDetail(query);
}));

router.delete('/deleteArticle', reply(async (req) => {
    const query = req.query;
    console.log(query)
    return await deleteArticle(query);
}));

router.get('/getComment', reply(async (req) => {
    const query = req.query;
    return await getComment(query);
}));

router.post('/addComment', reply(async (req) => {
    const body = req.body;
    console.log(body)
    return await addComment(body);
}));

router.delete('/deleteComment', reply(async (req) => {
    const query = req.query;
    console.log(query)
    return await deleteComment(query);
}));

router.get('/error', (req, res) => {
    throw new Error();
})

router.use(pageNotFound());

// router.use(errorHandler());

module.exports = router;