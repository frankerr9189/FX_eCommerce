const express = require("express");
const router = express.Router();

const {requireSignin, isAuth, isAdmin} = require("../controllers/auth");
const {userById, addOrderToUserHistory} = require("../controllers/user");
const {create, guestCreate, listOrders, getStatusValues, orderById, updateOrderStatus, guestShipping, getMethodValues} = require("../controllers/order");
const {decreaseQuantity} = require('../controllers/product');

router.post(
"/order/create/:userId", 
requireSignin, 
isAuth, 
addOrderToUserHistory,
decreaseQuantity,
create
);

router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders);
router.get('/order/status-values/:userId', requireSignin, isAuth, isAdmin, getStatusValues);
router.put('/order/:orderId/status/:userId', requireSignin, isAuth, isAdmin, updateOrderStatus);
//router.get('/order/methodValues/:userId', requireSignin, isAuth, getMethodValues);

router.param('userId', userById);
router.param('orderId', orderById);

//Guest Check
router.post(
    "/order/guestcreate/",  
    decreaseQuantity,
    guestCreate
    );

router.post(
    '/shippinginfo/',
    guestShipping
    );

module.exports = router;