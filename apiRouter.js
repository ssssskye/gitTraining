const router = require('express').Router();
const bodyParser = require('body-parser');
// const { reply, pageNotFound, errorHandler } = require('./middware');
router.use(bodyParser.json({ type: ['application/json', 'application/**json']}));

router.get('/',(req,res) =>{ res.send("version: '1.0'")});
router.get('/1',(req,res) =>{ res.send("version: '2.0'")});

router.get('/error', (req,res)=>{
    throw new Error();
})

// router.use(pageNotFound());

// router.use(errorHandler());

module.exports = router;