const express = require('express');
const router = express.Router();
 
const views = require('../controller/view.controller');

router.get("/create", views.create);
router.get("/", views.home);
router.get("/showCar/:id", views.showCar);
router.get("/edit/:id", views.update);
router.get("/delete/:id", views.delete);
router.get("/register", views.register);
router.get("/login", views.login);
router.get("/logout", views.logout);

module.exports = router;