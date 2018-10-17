var express = require('express');
var router = express.Router();

var CategoryUser = require('../Controller/userController');
var CategoryController = require('../Controller/categoryController');
var ProductController = require('../Controller/productController');

var passport = require('passport');
var multer=require('multer');
var upload=multer({dest:'uploads/'});
var type=upload.single('upfile');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

router.post('/login', type,function(req, res, next) {
      passport.authenticate('login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send(info); }
        req.logIn(user, function(err) {
          if (err) { return next(info); }
          return res.send(user);
        });
      })(req, res, next);
});

router.get('/getCategories', type,function(req, res) {
    var Categories= async (function (){
        await (CategoryController.getCategories(req,res));
    });
    Categories();
});

router.post('/getCategory', type,function(req, res) {
    var Category = async (function (){
        await (CategoryController.getCategory(req,res));
    });
    Category();
});


router.post('/getProduct', type,function(req, res) {
    var Product = async (function (){
        await (ProductController.getProduct(req,res));
    });
    Product();
});

router.post('/SearchProduct', type,function(req, res) {
    var Search = async (function (){
        await (ProductController.searchProduct(req,res));
    });
    Search();
});

router.post('/AddProduct', type,function(req, res) {
    var AddProduct = async (function (){
        var NextCode = await (ProductController.GetNextCode(req,res));
        await (ProductController.addProduct(req,res,NextCode));
    });
    AddProduct();
});

router.post('/EditProduct', type,function(req, res) {
    var EditProduct = async (function (){
        await (ProductController.editProduct(req,res,NextCode));
    });
    EditProduct();
});


module.exports = router;
