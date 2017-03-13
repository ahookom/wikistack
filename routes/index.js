let express = require('express');
let router = express.Router();
let fs = require('fs');
let wiki = require('./wiki.js');


router.use('/wiki',wiki);

router.get('/',function(req,res,next){
  wiki.page.findAll()
  .then(function(results) {
    results = results.map(function(result) {
      return result.dataValues;
    });
    console.log(results);
    res.render('index.html', {pages:results});
  });
  ///add some stuff
});



// router.get('/stylesheets/style.css',function(req,res,next){
//   res.send(fs.readFileSync('../public/stylesheets/style.css'));
//   ///add some stuff
// });



module.exports = router;
