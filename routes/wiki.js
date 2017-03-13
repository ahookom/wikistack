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

  let page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  let author = User.build({
    name: req.body.name,
    email: req.body.email
  });

  page.save()
  .then(function(){
    return author.save();
  })
  .then(function(){
    res.redirect('/');
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



module.exports = router;
