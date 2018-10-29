var express = require('express');
var router = express.Router();

var User = require('../Controller/userController');
var CategoryController = require('../Controller/categoryController');
var ProductController = require('../Controller/productController');
var SupplierController = require('../Controller/supplierController');
var SetupController = require('../Controller/lutSetupController');



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

router.post('/getAllProduct', type,function(req, res) {
    var Product = async (function (){
        await (ProductController.getAllProduct(req,res));
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

router.get('/getSupplier', type,function(req, res) {
    var Supplier = async (function (){
        await (SupplierController.getSupplier(req,res));
    });
    Supplier();
});

router.get('/getAllSupplier', type,function(req, res) {
    var Supplier = async (function (){
        await (SupplierController.getAllSuppliers(req,res));
    });
    Supplier();
});

router.get('/getCountries', type,function(req, res) {
    var Countries= async (function (){
        await (SetupController.getCountries(req,res));
    });
    Countries();
});

router.get('/getSupplierTypes', type,function(req, res) {
    var SupplierTypes= async (function (){
        await (SetupController.getSupplierTypes(req,res));
    });
    SupplierTypes();
});

router.get('/getPaymentMethods', type,function(req, res) {
    var PaymentMethods= async (function (){
        await (SetupController.getPaymentMethods(req,res));
    });
    PaymentMethods();
});

router.get('/getWaysOfDelivery', type,function(req, res) {
    var WaysOfDelivery= async (function (){
        await (SetupController.getWaysOfDelivery(req,res));
    });
    WaysOfDelivery();
});

router.get('/getClasses', type,function(req, res) {
    var Classes= async (function (){
        await (SetupController.getClasses(req,res));
    });
    Classes();
});

router.post('/AddSupplier', type,function(req, res) {
    var AddSupplier = async (function (){
        var NextCode = await (SupplierController.GetNextCode(req,res));
        await (SupplierController.addSupplier(req,res,NextCode));
    });
    AddSupplier();
});

router.post('/EditSupplier', type,function(req, res) {
    var EditSupplier = async (function (){
        await (SupplierController.editSupplier(req,res,NextCode));
    });
    EditSupplier();
});

router.post('/EditSupplierContact', type,function(req, res) {
    var EditSupplierContact = async (function (){
        await (SupplierController.editSupplierContact(req,res));
    });
    EditSupplierContact();
});


router.post('/AddUser', type,function(req, res) {
    var addUser = async (function (){
        var NextCode = await (User.GetNextCode(req,res));
        await (User.addUser(req,res,NextCode));
    });
    addUser();
});

module.exports = router;
