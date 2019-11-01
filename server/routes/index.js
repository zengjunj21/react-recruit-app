var express = require('express');
var router = express.Router();

/* GET home page. 
    配置路由
    渲染index页面，并传递了一个title,在index中可以看到有接收title

*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express,哈哈' });
});

module.exports = router;
