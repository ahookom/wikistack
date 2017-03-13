let express = require('express');
let router = express.Router();
let models = require('../models');
let Page = models.Page;
let User = models.User;

router.get('/',function(req,res,next){
//  res.send('you made it to wiki.js');
 res.redirect('/');
});


router.post('/',function(req,res,next){
  // let newUrl = req.body.title.replace(/[^\w+]/g, '_');
  // console.log('req.body.title , newUrl: ', req.body.title, newUrl);
  let page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });

  let author = User.build({
    name: req.body.name,
    email: req.body.email
  });

  author.save()
  .then(function(){
    return page.save();
  })
  .then(function(savePage){
    res.redirect(savePage.route);
  })
  .catch(function(err){

    next(err);
  });
//  res.send('poster child for wikipedia');
  // res.json(req.body);
});

router.get('/add',function(req,res,next){

  res.render('addpage');
});

router.get('/:page',function(req,res,next){
  Page.findAll({
    where: {
      urlTitle: req.params.page
    }
  }).then(function(result,err){
    console.log(result[0].dataValues);
    res.render('wikipage',{page: result[0].dataValues});
  }).catch(next);

});

router.page = Page;
router.user = User;

module.exports = router;
