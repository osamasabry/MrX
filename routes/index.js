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

router.post('/AddCategory', type,function(req, res) {
    var AddCategory = async (function (){
        CategoryController.addCategory(req,res)
    });
    AddCategory();
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
        await (ProductController.editProduct(req,res));
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

router.get('/getForm', type,function(req, res) {
    var Form = async (function (){
        await (SetupController.getForm(req,res));
    });
    Form();
});

router.get('/getPacking', type,function(req, res) {
    var Packing = async (function (){
        await (SetupController.getPacking(req,res));
    });
    Packing();
});

router.get('/getProductCategory', type,function(req, res) {
    var ProductCategory = async (function (){
        await (SetupController.getProductCategory(req,res));
    });
    ProductCategory();
});

router.get('/getReleaseType', type,function(req, res) {
    var ReleaseType = async (function (){
        await (SetupController.getReleaseType(req,res));
    });
    ReleaseType();
});

router.get('/getStorageType', type,function(req, res) {
    var StorageType = async (function (){
        await (SetupController.getStorageType(req,res));
    });
    StorageType();
});

router.post('/AddCountry', type,function(req, res) {
    var AddCountry = async (function (){
        var NextCode = await (SetupController.GetNextCodeCountry(req,res));
        await (SetupController.addCountry(req,res,NextCode));
    });
    AddCountry();
});

router.post('/EditCountry', type,function(req, res) {
    var EditCountry = async (function (){
        await (SetupController.editCountry(req,res));
    });
    EditCountry();
});


router.post('/AddSupplierType', type,function(req, res) {
    var AddSupplierType = async (function (){
        var NextCode = await (SetupController.GetNextCodeSupplierType(req,res));
        await (SetupController.addSupplierType(req,res,NextCode));
    });
    AddSupplierType();
});

router.post('/EditSupplierType', type,function(req, res) {
    var EditSupplierType = async (function (){
        await (SetupController.editSupplierType(req,res));
    });
    EditSupplierType();
});


router.post('/AddSupplierClass', type,function(req, res) {
    var AddSupplierClass = async (function (){
        var NextCode = await (SetupController.GetNextCodeSupplierClass(req,res));
        await (SetupController.addSupplierClass(req,res,NextCode));
    });
    AddSupplierClass();
});

router.post('/EditSupplierClass', type,function(req, res) {
    var EditSupplierClass = async (function (){
        await (SetupController.editSupplierClass(req,res));
    });
    EditSupplierClass();
});


router.post('/AddPaymentMethod', type,function(req, res) {
    var AddPaymentMethod = async (function (){
        var NextCode = await (SetupController.GetNextCodePaymentMethods(req,res));
        await (SetupController.addPaymentMethod(req,res,NextCode));
    });
    AddPaymentMethod();
});

router.post('/EditPaymentMethod', type,function(req, res) {
    var EditPaymentMethod = async (function (){
        await (SetupController.editPaymentMethod(req,res));
    });
    EditPaymentMethod();
});

router.post('/AddWaysOfDelivery', type,function(req, res) {
    var AddWaysOfDelivery = async (function (){
        var NextCode = await (SetupController.GetNextCodeWaysOfDelivery(req,res));
        await (SetupController.addWaysOfDelivery(req,res,NextCode));
    });
    AddWaysOfDelivery();
});

router.post('/EditWaysOfDelivery', type,function(req, res) {
    var EditWaysOfDelivery = async (function (){
        await (SetupController.editWaysOfDelivery(req,res));
    });
    EditWaysOfDelivery();
});


router.post('/AddForm', type,function(req, res) {
    var AddForm = async (function (){
        var NextCode = await (SetupController.GetNextCodeForm(req,res));
        await (SetupController.addForm(req,res,NextCode));
    });
    AddForm();
});

router.post('/EditForm', type,function(req, res) {
    var EditForm = async (function (){
        await (SetupController.editForm(req,res));
    });
    EditForm();
});

router.post('/AddPacking', type,function(req, res) {
    var AddPacking = async (function (){
        var NextCode = await (SetupController.GetNextCodePacking(req,res));
        await (SetupController.addPacking(req,res,NextCode));
    });
    AddPacking();
});

router.post('/EditPacking', type,function(req, res) {
    var EditPacking = async (function (){
        await (SetupController.editPacking(req,res));
    });
    EditPacking();
});


router.post('/AddProductCategory', type,function(req, res) {
    var AddProductCategory = async (function (){
        var NextCode = await (SetupController.GetNextCodeProductCategory(req,res));
        await (SetupController.addProductCategory(req,res,NextCode));
    });
    AddProductCategory();
});

router.post('/EditProductCategory', type,function(req, res) {
    var EditProductCategory = async (function (){
        await (SetupController.editProductCategory(req,res));
    });
    EditProductCategory();
});


router.post('/AddReleaseType', type,function(req, res) {
    var AddReleaseType = async (function (){
        var NextCode = await (SetupController.GetNextCodeReleaseType(req,res));
        await (SetupController.addReleaseType(req,res,NextCode));
    });
    AddReleaseType();
});

router.post('/EditReleaseType', type,function(req, res) {
    var EditReleaseType = async (function (){
        await (SetupController.editReleaseType(req,res));
    });
    EditReleaseType();
});


router.post('/AddStorageType', type,function(req, res) {
    var AddStorageType = async (function (){
        var NextCode = await (SetupController.GetNextCodeStorageType(req,res));
        await (SetupController.addStorageType(req,res,NextCode));
    });
    AddStorageType();
});

router.post('/EditStorageType', type,function(req, res) {
    var EditStorageType = async (function (){
        await (SetupController.editStorageType(req,res));
    });
    EditStorageType();
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
        await (SupplierController.editSupplier(req,res));
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
